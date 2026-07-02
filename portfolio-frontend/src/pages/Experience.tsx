import ExperienceHero from '../components/experience/ExperienceHero';
import JourneyTimeline from '../components/experience/JourneyTimeline';
import EducationSection from '../components/experience/EducationSection';
import CurrentFocus from '../components/experience/CurrentFocus';
import CTASection from '../components/common/CTASection';

export default function Experience() {
  return (
    <>
      <ExperienceHero />
      <JourneyTimeline />
      <EducationSection />
      <CurrentFocus />
      <CTASection />
    </>
  );
}
