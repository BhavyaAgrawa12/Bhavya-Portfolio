import { fetchAllEducation } from '../api/education.api';
import type { EducationEntry } from '../types/portfolio';

export async function getEducation(): Promise<EducationEntry[]> {
  const data = await fetchAllEducation();
  return data.map((e) => ({
    id: e.id,
    institution: e.institution,
    degree: `${e.degree}${e.field ? ` in ${e.field}` : ''}`,
    location: e.location ?? undefined,
    startDate: e.startDate ?? undefined,
    endDate: e.endDate ?? undefined,
    description: e.description ?? undefined,
    coursework: [], // not stored on this model
  }));
}
