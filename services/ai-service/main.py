import json
from datetime import datetime
from http.server import BaseHTTPRequestHandler, HTTPServer
from urllib.parse import urlparse

from src.logic.freshnessScore import (
    calculate_edibility_score,
    calculate_freshness_score,
    calculate_spoilage_risk,
)

PORT = 3007


class Handler(BaseHTTPRequestHandler):
    def _set_headers(self, status=200):
        self.send_response(status)
        self.send_header("Content-Type", "application/json")
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.send_header("Access-Control-Allow-Methods", "GET,POST,OPTIONS")
        self.end_headers()

    def do_OPTIONS(self):
        self._set_headers(204)

    def do_GET(self):
        parsed = urlparse(self.path)
        if parsed.path == "/health":
            self._set_headers(200)
            self.wfile.write(json.dumps({"status": "healthy", "service": "ai-service"}).encode())
            return

        self._set_headers(404)
        self.wfile.write(json.dumps({"error": "Not found"}).encode())

    def do_POST(self):
        parsed = urlparse(self.path)
        if parsed.path != "/api/assess":
            self._set_headers(404)
            self.wfile.write(json.dumps({"error": "Not found"}).encode())
            return

        content_length = int(self.headers.get("Content-Length", 0))
        payload = json.loads(self.rfile.read(content_length) or b"{}")

        preparation_time = payload.get("preparationDate") or datetime.now().isoformat()
        food_type = payload.get("foodType", "prepared")
        temperature = float(payload.get("temperature", 4))

        freshness_score = calculate_freshness_score(preparation_time)
        hours_since_prep = max(
            0,
            (datetime.now() - datetime.fromisoformat(preparation_time)).total_seconds() / 3600,
        )
        spoilage_risk = calculate_spoilage_risk(food_type, temperature, hours_since_prep)
        assessment = calculate_edibility_score(freshness_score, spoilage_risk, food_type)

        self._set_headers(200)
        self.wfile.write(json.dumps(assessment).encode())


def run():
    server = HTTPServer(("", PORT), Handler)
    print(f"AI service running on port {PORT}")
    server.serve_forever()


if __name__ == "__main__":
    run()
