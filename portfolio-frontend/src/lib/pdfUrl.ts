/**
 * Returns the PDF URL exactly as stored from Cloudinary.
 *
 * PDFs are now uploaded via Cloudinary's image pipeline (resource_type: "image",
 * format: "pdf"). This delivers them with Content-Disposition: inline by default,
 * so they open in the browser's PDF viewer without any transformation flags.
 *
 * The secure_url from the upload response is stored directly and used here
 * without modification.
 */
export function pdfUrl(url: string | null | undefined): string | undefined {
  if (!url) return undefined;
  return url; // exact Cloudinary URL — no manual transformation
}

/**
 * Opens a PDF in a new browser tab.
 * Since PDFs are now image-type Cloudinary assets, they open inline naturally.
 */
export function openPdf(url: string | null | undefined): void {
  if (!url) return;
  window.open(url, '_blank', 'noopener,noreferrer');
}
