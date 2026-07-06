/**
 * Converts a Cloudinary raw PDF URL to an inline-displayable URL.
 *
 * By default Cloudinary raw assets are served with Content-Disposition: attachment
 * which forces the browser to download instead of displaying inline.
 *
 * Adding the fl_inline transformation flag tells Cloudinary to set:
 *   Content-Disposition: inline
 * which allows the browser's built-in PDF viewer to open the file.
 *
 * Input:  https://res.cloudinary.com/cloud/raw/upload/v123/portfolio/resume/abc.pdf
 * Output: https://res.cloudinary.com/cloud/raw/upload/fl_inline/v123/portfolio/resume/abc.pdf
 *
 * For non-Cloudinary URLs (e.g. /resume.pdf fallback) returns the URL unchanged.
 */
export function pdfUrl(url: string | null | undefined): string | undefined {
  if (!url) return undefined;

  // Non-Cloudinary URL — return as-is
  if (!url.includes('cloudinary.com')) return url;

  // Already has fl_inline — don't double-add
  if (url.includes('fl_inline')) return url;

  // Insert fl_inline after /upload/
  return url.replace('/upload/', '/upload/fl_inline/');
}
