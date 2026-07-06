/**
 * Returns the PDF URL exactly as stored from Cloudinary.
 *
 * We do NOT add any transformations (fl_inline, fl_attachment, etc.)
 * because Cloudinary returns 400 for unsupported transformation flags
 * on raw resource types.
 *
 * The secure_url returned by Cloudinary is the exact delivery URL.
 * We store it and use it directly — no manual URL construction.
 *
 * Whether the browser opens or downloads the PDF depends on the
 * browser's own PDF handling, which is the correct behaviour.
 */
export function pdfUrl(url: string | null | undefined): string | undefined {
  if (!url) return undefined;
  return url; // return exactly as stored — never modify Cloudinary URLs
}
