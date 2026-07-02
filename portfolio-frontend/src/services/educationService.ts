import { mockDelay } from './base/mockDelay';
import type { EducationEntry } from '../types/portfolio';
import { education } from '../data/education';

export async function getEducation(): Promise<EducationEntry[]> {
  await mockDelay();
  return education;
}
