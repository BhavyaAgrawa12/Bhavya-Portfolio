import { motion } from 'framer-motion';
import { Server, LayoutDashboard, Database, Brain, FolderKanban, TrendingUp } from 'lucide-react';

import Container from '../common/Container';
import SectionTitle from '../common/SectionTitle';
import GlassCard from '../common/GlassCard';
import { staggerContainer, staggerItem, VIEWPORT } from '../../lib/motion';

const interests = [
  { icon: Server, title: 'Backend Engineering', description: 'Passionate about designing scalable backend systems, REST APIs, authentication, and clean application architecture.' },
  { icon: LayoutDashboard, title: 'Modern UI Development', description: 'Enjoy building responsive, polished interfaces that combine clean design with great user experience.' },
  { icon: Database, title: 'Database Design', description: 'Interested in designing efficient relational databases and writing maintainable data models using Prisma and MySQL.' },
  { icon: Brain, title: 'Problem Solving', description: 'Enjoy breaking complex problems into simple, maintainable, and efficient software solutions through logical thinking.' },
  { icon: FolderKanban, title: 'Project Building', description: 'Love turning ideas into complete applications, from planning and UI design to backend development and deployment.' },
  { icon: TrendingUp, title: 'Continuous Growth', description: 'Always building new projects, exploring modern technologies, and improving my skills as a full-stack developer.' },
];

export default function BeyondCoding() {
  return (
    <section className="py-24">
      <Container className="flex flex-col gap-14">
        <SectionTitle
          eyebrow="Beyond Development"
          title="What Drives Me"
          subtitle="The areas of software engineering that continuously inspire me to learn, build, and grow."
        />

        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {interests.map(({ icon: Icon, title, description }) => (
            <motion.div key={title} variants={staggerItem}>
              <GlassCard className="group flex h-full flex-col gap-4 rounded-3xl p-6 transition-all duration-300 hover:-translate-y-2 hover:border-[var(--color-accent-blue)]/40">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--color-accent-blue)]/10">
                  <Icon size={24} className="text-[var(--color-accent-blue)] transition-transform duration-300 group-hover:scale-110" />
                </div>
                <h3 className="text-xl font-semibold">{title}</h3>
                <p className="leading-7 text-[var(--color-text-secondary)]">{description}</p>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
