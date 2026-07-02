import { Box, TrendingUp, ShieldCheck, Zap, Fingerprint, LineChart } from 'lucide-react';
import Container from '../common/Container';
import SectionTitle from '../common/SectionTitle';
import PrincipleCard from './PrincipleCard';

const principles = [
  { icon: Box, title: 'Clean Architecture', description: 'Building systems that last', iconColor: 'text-[var(--color-accent-purple)]' },
  { icon: TrendingUp, title: 'Scalability', description: 'Designing for growth and traffic', iconColor: 'text-emerald-400' },
  { icon: ShieldCheck, title: 'Security', description: 'Prioritizing data integrity', iconColor: 'text-[var(--color-accent-blue)]' },
  { icon: Zap, title: 'Performance', description: 'Optimizing for speed and efficiency', iconColor: 'text-amber-400' },
  { icon: Fingerprint, title: 'User Experience', description: 'Engineering meets user empathy', iconColor: 'text-[var(--color-accent-purple)]' },
  { icon: LineChart, title: 'Continuous Learning', description: 'Staying ahead of the curve', iconColor: 'text-emerald-400' },
];

export default function EngineeringPrinciples() {
  return (
    <section className="py-20">
      <Container className="flex flex-col gap-12">
        <SectionTitle
          eyebrow="Philosophy"
          title="Engineering Principles"
          subtitle="A bento grid of core coverage feature cards."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {principles.map((p) => (
            <PrincipleCard key={p.title} {...p} />
          ))}
        </div>
      </Container>
    </section>
  );
}
