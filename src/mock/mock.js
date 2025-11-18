// Frontend-only mock module (no backend used)
// Exporting helper for EAN / product name logic so it’s easy to swap later if needed.

export function buildGalaxusSearchUrl(eanOrName) {
  const trimmed = (eanOrName || "").trim();
  const query = encodeURIComponent(trimmed);
  // Plain keyword search on Galaxus
  return `https://www.galaxus.ch/en/search?q=${query}`;
}

export function buildToppreiseSearchUrl(queryValue) {
  const trimmed = (queryValue || "").trim();
  const query = encodeURIComponent(trimmed);
  // Toppreise produktsuche pattern
  return `https://www.toppreise.ch/produktsuche?q=${query}&cid=`;
}

export function buildBrackSearchUrl(queryValue) {
  const trimmed = (queryValue || "").trim();
  const query = encodeURIComponent(trimmed);
  return `https://www.brack.ch/search?query=${query}`;
}

export function buildFustSearchUrl(queryValue) {
  const trimmed = (queryValue || "").trim();
  const query = encodeURIComponent(trimmed);
  return `https://www.fust.ch/search?q=${query}`;
}

export function isValidEan(ean) {
  const value = (ean || "").trim();
  if (!value) return false;
  // Allow 8, 12, 13, 14 digits – common EAN/UPC lengths
  const digitsOnly = /^\d{8}$|^\d{12}$|^\d{13}$|^\d{14}$/;
  return digitsOnly.test(value);
}
