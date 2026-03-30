export function readServicePort(name, fallback) {
  const key = `${name.toUpperCase()}_PORT`;
  return Number(process.env[key] || fallback);
}