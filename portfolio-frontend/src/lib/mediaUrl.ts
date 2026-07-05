/**
 * Resolves a backend-relative file URL to an absolute URL.
 *
 * The backend stores fileUrl as e.g. "/uploads/abc.jpg".
 * VITE_UPLOADS_BASE_URL is "http://localhost:5000".
 * So this returns "http://localhost:5000/uploads/abc.jpg".
 *
 * Returns undefined if fileUrl is falsy so callers can safely
 * use the `??` operator to fall back to a placeholder.
 */
const UPLOADS_BASE = (import.meta.env.VITE_UPLOADS_BASE_URL as string) ?? '';

export function mediaUrl(fileUrl: string | null | undefined): string | undefined {
  if (!fileUrl) return undefined;
  if (fileUrl.startsWith('http')) return fileUrl;
  return `${UPLOADS_BASE}${fileUrl}`;
}
