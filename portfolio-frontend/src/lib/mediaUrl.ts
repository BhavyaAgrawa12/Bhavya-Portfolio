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
