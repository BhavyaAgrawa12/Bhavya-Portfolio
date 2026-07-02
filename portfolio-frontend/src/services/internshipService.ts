import { mockDelay } from './base/mockDelay';
import type { InternshipEntry } from '../types/portfolio';
import { internships } from '../data/internships';

export async function getInternships(): Promise<InternshipEntry[]> {
  await mockDelay();
  return internships;
}
