import { fetchAllInternships } from '../api/internships.api';
import type { InternshipEntry } from '../types/portfolio';
import { mediaUrl } from '../lib/mediaUrl';

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
    // mediaUrl() returns Cloudinary URLs unchanged; handles legacy /uploads/ paths
    logo: mediaUrl(i.logo?.fileUrl),
  }));
}
