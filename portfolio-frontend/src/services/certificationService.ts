import { fetchAllCertifications } from '../api/certifications.api';
import type { CertificationEntry } from '../types/portfolio';

const BASE = (import.meta.env.VITE_UPLOADS_BASE_URL as string) ?? '';

export async function getCertifications(): Promise<CertificationEntry[]> {
  const data = await fetchAllCertifications();
  return data.map((c) => ({
    id: c.id,
    title: c.title,
    issuer: c.issuer,
    status: c.issueDate
      ? new Date(c.issueDate).toLocaleDateString('en-US', {
          month: 'short',
          year: 'numeric',
        })
      : undefined,
    icon: 'default' as const,
    image: c.certificateImage ? `${BASE}${c.certificateImage.fileUrl}` : undefined,
    credentialUrl: c.credentialUrl ?? undefined,
    issueDate: c.issueDate ?? undefined,
  }));
}
