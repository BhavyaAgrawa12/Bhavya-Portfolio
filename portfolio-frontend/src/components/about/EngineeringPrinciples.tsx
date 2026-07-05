import { motion } from 'framer-motion';
import { Box, TrendingUp, ShieldCheck, Zap, Fingerprint, LineChart } from 'lucide-react';
import Container from '../common/Container';
import SectionTitle from '../common/SectionTitle';
import GlassCard from '../common/GlassCard';
import { staggerContainer, staggerItem, VIEWPORT } from '../../lib/motion';

const principles = [
  { icon: Box, title: 'Clean Architecture', description: 'Building systems that last', color: 'text-[var(--color-accent-purple)]' },
  { icon: TrendingUp, title: 'Scalability', description: 'Designing for growth and traffic', color: 'text-emerald-400' },
  { icon: ShieldCheck, title: 'Security', description: 'Prioritizing data integrity', color: 'text-[var(--color-accent-blue)]' },
  { icon: Zap, title: 'Performance', description: 'Optimizing for speed and efficiency', color: 'text-amber-400' },
  { icon: Fingerprint, title: 'User Experience', description: 'Engineering meets user empathy', color: 'text-[var(--color-accent-purple)]' },
  { icon: LineChart, title: 'Continuous Learning', description: 'Staying ahead of the curve', color: 'text-emerald-400' },
];

export default function EngineeringPrinciples() {
  return (
    <section className="py-20">
      <Container className="flex flex-col gap-12">
        <SectionTitle
          eyebrow="Philosophy"
          title="Engineering Principles"
          subtitle="Core values that guide every line of code I write."
        />

        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {principles.map(({ icon: Icon, title, description, color }) => (
            <motion.div key={title} variants={staggerItem}>
              <GlassCard className="group flex h-full flex-col gap-4 rounded-3xl p-6 transition-all duration-300 hover:-translate-y-2 hover:border-[var(--color-accent-blue)]/40">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/5">
                  <Icon size={24} className={`${color} transition-transform duration-300 group-hover:scale-110`} />
                </div>
                <h3 className="text-xl font-semibold">{title}</h3>
                <p className="text-sm leading-6 text-[var(--color-text-secondary)]">{description}</p>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
