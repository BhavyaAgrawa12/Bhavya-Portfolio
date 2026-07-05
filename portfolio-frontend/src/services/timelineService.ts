/**
 * The backend does not have a dedicated timeline/journey endpoint.
 * The timeline displayed in JourneyTimeline comes from the static data.
 * We keep this file so JourneyTimeline continues to work unchanged.
 * When the admin enters milestones via the portfolio CMS in the future,
 * this can be swapped to an API call with zero changes to the component.
 */
import { engineeringJourney } from '../data/timeline';
import type { TimelineEvent } from '../types/portfolio';

export async function getEngineeringJourney(): Promise<TimelineEvent[]> {
  return engineeringJourney;
}
