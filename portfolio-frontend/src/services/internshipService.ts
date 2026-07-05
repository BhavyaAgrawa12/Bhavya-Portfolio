import { fetchAllInternships } from '../api/internships.api';
import type { InternshipEntry } from '../types/portfolio';

const BASE = (import.meta.env.VITE_UPLOADS_BASE_URL as string) ?? '';

export async function getInternships(): Promise<InternshipEntry[]> {
  const data = await fetchAllInternships();
  return data.map((i) => ({
    id: i.id,
    company: i.company,
    position: i.position,
    duration: [i.startDate, i.endDate]
      .filter(Boolean)
      .map((d) => new Date(d!).getFullYear().toString())
      .join(' – '),
    location: i.location ?? undefined,
    responsibilities: i.description
      ? i.description.split('\n').filter(Boolean)
      : [],
    logo: i.logo ? `${BASE}${i.logo.fileUrl}` : undefined,
  }));
}
