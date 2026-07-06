/**
 * Resolves a media fileUrl to a displayable URL.
 *
 * After the Cloudinary migration, fileUrl is always an absolute
 * https://res.cloudinary.com/... URL — so this function mostly just
 * returns it unchanged.
 *
 * It also handles legacy relative paths (/uploads/...) that may exist
 * in the database from before the migration, converting them using
 * VITE_UPLOADS_BASE_URL or deriving the base from VITE_API_BASE_URL.
 *
 * For external URLs (Google Drive, etc.), we can store them in fileName
 * and use this function to detect and return them.
 *
 * Returns undefined for falsy input so callers can use ?? for fallbacks.
 */

function getLegacyBase(): string {
  const explicit = import.meta.env.VITE_UPLOADS_BASE_URL as string | undefined;
  if (explicit) return explicit.replace(/\/$/, '');

  const api = import.meta.env.VITE_API_BASE_URL as string | undefined;
  if (api) return api.replace(/\/api\/v1\/?$/, '').replace(/\/$/, '');

  return '';
}

const LEGACY_BASE = getLegacyBase();

export function mediaUrl(fileUrl: string | null | undefined): string | undefined {
  if (!fileUrl) return undefined;

  // Cloudinary URLs and any other absolute URLs — return as-is
  if (fileUrl.startsWith('http://') || fileUrl.startsWith('https://')) {
    return fileUrl;
  }

  // Legacy relative path from before Cloudinary migration
  return `${LEGACY_BASE}${fileUrl}`;
}

/**
 * Detects if a fileName is an external URL (http/https).
 * Used to support external resume links (Google Drive, etc.) stored in fileName.
 */
export function isExternalUrl(fileName: string | null | undefined): boolean {
  if (!fileName) return false;
  return fileName.startsWith('http://') || fileName.startsWith('https://');
}
