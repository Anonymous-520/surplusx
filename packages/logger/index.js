export function logInfo(message, details = {}) {
  console.log(`[INFO] ${message}`, details);
}

export function logError(message, details = {}) {
  console.error(`[ERROR] ${message}`, details);
}