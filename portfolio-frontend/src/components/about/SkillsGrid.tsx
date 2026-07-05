import { motion } from 'framer-motion';
import { Code2, Server, Database, Wrench, Cloud, Languages } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

import Container from '../common/Container';
import SectionTitle from '../common/SectionTitle';
import GlassCard from '../common/GlassCard';
import LoadingSpinner from '../common/LoadingSpinner';
import { useSkills } from '../../hooks/useSkills';
import type { SkillCategory } from '../../types/api';
import { staggerContainer, staggerItem, VIEWPORT } from '../../lib/motion';

const CATEGORY_META: Record<SkillCategory, { label: string; icon: LucideIcon; color: string }> = {
  FRONTEND: { label: 'Frontend', icon: Code2, color: 'text-orange-400' },
  BACKEND: { label: 'Backend', icon: Server, color: 'text-emerald-400' },
  DATABASE: { label: 'Database', icon: Database, color: 'text-[var(--color-accent-blue)]' },
  DEVOPS: { label: 'DevOps', icon: Cloud, color: 'text-sky-400' },
  LANGUAGE: { label: 'Languages', icon: Languages, color: 'text-violet-400' },
  TOOL: { label: 'Tools', icon: Wrench, color: 'text-red-400' },
};

const FALLBACK_CATEGORIES = [
  { icon: Code2, title: 'Frontend', color: 'text-orange-400', skills: ['React', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'HTML5', 'Framer Motion'] },
  { icon: Server, title: 'Backend', color: 'text-emerald-400', skills: ['Node.js', 'Express.js', 'REST APIs', 'JWT', 'Prisma', 'Socket.IO'] },
  { icon: Database, title: 'Database', color: 'text-[var(--color-accent-blue)]', skills: ['MySQL', 'MongoDB', 'SQLite'] },
  { icon: Wrench, title: 'Tools', color: 'text-red-400', skills: ['Git', 'GitHub', 'Postman', 'VS Code', 'Docker', 'Figma'] },
];

export default function SkillsGrid() {
  const { data: skills = [], isLoading } = useSkills();

  const grouped = skills.reduce<Record<string, string[]>>((acc, skill) => {
    const cat = skill.category;
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(skill.name);
    return acc;
  }, {});

  const hasData = Object.keys(grouped).length > 0;
  const categories = hasData
    ? (Object.keys(grouped) as SkillCategory[]).map((cat) => ({
        key: cat,
        icon: CATEGORY_META[cat]?.icon ?? Wrench,
        title: CATEGORY_META[cat]?.label ?? cat,
        color: CATEGORY_META[cat]?.color ?? 'text-white',
        skills: grouped[cat],
      }))
    : FALLBACK_CATEGORIES.map((c) => ({ key: c.title, ...c }));

  return (
    <section className="py-20">
      <Container className="flex flex-col gap-12">
        <SectionTitle
          eyebrow="Toolbox"
          title="Tech Stack"
          subtitle="Technologies I use to design, build, and deploy modern software."
        />

        {isLoading ? (
          <LoadingSpinner message="Loading skills…" />
        ) : (
          <motion.div
            variants={staggerContainer(0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            className={`grid gap-6 ${hasData ? 'sm:grid-cols-2 lg:grid-cols-3' : 'sm:grid-cols-2 lg:grid-cols-4'}`}
          >
            {categories.map(({ key, icon: Icon, title, color, skills: catSkills }) => (
              <motion.div key={key} variants={staggerItem}>
                <GlassCard className="group flex h-full flex-col rounded-3xl p-6 transition-all duration-300 hover:-translate-y-2">
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-white/5 p-3">
                      <Icon size={26} className={`${color} transition-transform duration-300 group-hover:scale-110`} />
                    </div>
                    <h3 className="text-xl font-semibold">{title}</h3>
                  </div>
                  <div className="mt-6 flex flex-wrap gap-3">
                    {catSkills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-[var(--color-text-secondary)] transition-all duration-300 hover:border-[var(--color-accent-blue)] hover:bg-[var(--color-accent-blue)]/10 hover:text-white"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        )}
      </Container>
    </section>
  );
}
