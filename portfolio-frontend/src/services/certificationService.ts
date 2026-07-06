import { fetchAllCertifications } from '../api/certifications.api';
import type { CertificationEntry } from '../types/portfolio';
import { mediaUrl } from '../lib/mediaUrl';

export async function getCertifications(): Promise<CertificationEntry[]> {
  const data = await fetchAllCertifications();
  return data.map((c) => ({
    id: c.id,
    title: c.title,
    issuer: c.issuer,
    status: c.issueDate
      ? new Date(c.issueDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
      : undefined,
    icon: 'default' as const,
    // mediaUrl() returns Cloudinary URLs unchanged; handles legacy /uploads/ paths
    image: mediaUrl(c.certificateImage?.fileUrl),
    credentialUrl: c.credentialUrl ?? undefined,
    issueDate: c.issueDate ?? undefined,
  }));
}
