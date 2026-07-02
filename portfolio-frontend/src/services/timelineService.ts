import { mockDelay } from "./base/mockDelay";
import { engineeringJourney } from "../data/timeline";
import type { TimelineEvent } from "../types/portfolio";

export async function getEngineeringJourney(): Promise<TimelineEvent[]> {
  await mockDelay();
  return engineeringJourney;
}
