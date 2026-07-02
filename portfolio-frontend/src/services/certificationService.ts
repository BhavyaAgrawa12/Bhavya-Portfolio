import { mockDelay } from './base/mockDelay';
import type { CertificationEntry } from '../types/portfolio';
import { certifications } from '../data/certifications';

export async function getCertifications(): Promise<CertificationEntry[]> {
  await mockDelay();
  return certifications;
}
