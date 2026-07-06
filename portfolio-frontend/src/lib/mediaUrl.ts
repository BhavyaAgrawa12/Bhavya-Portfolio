/**
 * Resolves a backend-relative file URL to an absolute URL.
 *
 * Strategy (in order):
 * 1. If fileUrl already starts with http/https — return as-is (already absolute)
 * 2. Use VITE_UPLOADS_BASE_URL if set  (e.g. "https://bhavya-portfolio-xyoq.onrender.com")
 * 3. Derive from VITE_API_BASE_URL by stripping "/api/v1"
 *    (e.g. "https://bhavya-portfolio-xyoq.onrender.com/api/v1" → "https://bhavya-portfolio-xyoq.onrender.com")
 * 4. Fall back to empty string (relative URL) — works in local dev when
 *    the frontend is proxied to the backend on the same host
 *
 * This means you only NEED to set VITE_API_BASE_URL in Vercel and images
 * will automatically resolve to the correct Render backend URL.
 */

function getBase(): string {
  // Explicit override wins
  const explicit = import.meta.env.VITE_UPLOADS_BASE_URL as string | undefined;
  if (explicit) return explicit.replace(/\/$/, '');

  // Derive from the API URL
  const api = import.meta.env.VITE_API_BASE_URL as string | undefined;
  if (api) return api.replace(/\/api\/v1\/?$/, '').replace(/\/$/, '');

  return '';
}

const UPLOADS_BASE = getBase();

export function mediaUrl(fileUrl: string | null | undefined): string | undefined {
  if (!fileUrl) return undefined;
  if (fileUrl.startsWith('http')) return fileUrl;
  return `${UPLOADS_BASE}${fileUrl}`;
}
