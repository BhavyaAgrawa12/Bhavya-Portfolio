import AboutHero from '../components/about/AboutHero';
import MyJourney from '../components/about/MyJourney';
import EngineeringPrinciples from '../components/about/EngineeringPrinciples';
import SkillsGrid from '../components/about/SkillsGrid';
import EducationTimeline from '../components/about/EducationTimeline';
import BeyondCoding from '../components/about/BeyondCoding';
import CTASection from '../components/common/CTASection';

export default function About() {
  return (
    <>
      <AboutHero />
      <MyJourney />
      <EngineeringPrinciples />
      <SkillsGrid />
      <EducationTimeline />
      <BeyondCoding />
      <CTASection />
    </>
  );
}
