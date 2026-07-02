import Hero from '../components/home/Hero';
import AboutPreview from '../components/home/AboutPreview';
import FeaturedProjectsPreview from '../components/home/FeaturedProjectsPreview';
import JourneyPreview from '../components/home/JourneyPreview';
import CTASection from '../components/common/CTASection';

export default function Home() {
  return (
    <>
      <Hero />
      <AboutPreview />
      <FeaturedProjectsPreview />
      <JourneyPreview />
      <CTASection />
    </>
  );
}
