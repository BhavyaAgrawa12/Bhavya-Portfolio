import { motion } from 'framer-motion';
import Container from '../common/Container';
import SectionTitle from '../common/SectionTitle';
import Button from '../common/Button';
import ProjectCard from '../projects/ProjectCard';
import LoadingSpinner from '../common/LoadingSpinner';
import GlassCard from '../common/GlassCard';
import { useFeaturedProjects } from '../../hooks/useProjects';
import { adaptProject } from '../../services/projectService';
import { staggerContainer, staggerItem, fadeUp, VIEWPORT } from '../../lib/motion';

export default function FeaturedProjectsPreview() {
  const { data: raw = [], isLoading, isError, refetch } = useFeaturedProjects();
  const featuredProjects = raw.map(adaptProject);

  return (
    <section id="projects" className="relative py-24">
      <Container className="flex flex-col gap-14">
        <SectionTitle
          eyebrow="PORTFOLIO"
          title="Featured Projects"
          subtitle="A collection of projects that showcase my experience in full-stack development, backend engineering, modern UI design, and scalable software architecture."
        />

        {isLoading ? (
          <LoadingSpinner message="Loading projects…" />
        ) : isError ? (
          <GlassCard className="p-10 text-center text-[var(--color-text-secondary)]">
            Could not load projects.{' '}
            <button onClick={() => refetch()} className="text-[var(--color-accent-blue)] underline">
              Retry
            </button>
          </GlassCard>
        ) : featuredProjects.length > 0 ? (
          <motion.div
            variants={staggerContainer(0.12)}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            className="grid gap-8 md:grid-cols-2 xl:grid-cols-3"
          >
            {featuredProjects.map((project) => (
              <motion.div key={project.id} variants={staggerItem}>
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <GlassCard className="p-10 text-center text-[var(--color-text-secondary)]">
            No featured projects yet.
          </GlassCard>
        )}

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="flex justify-center"
        >
          <Button
            variant="outline"
            className="group transition-all duration-300 hover:border-[var(--color-accent-blue)] hover:bg-[var(--color-accent-blue)]/10 hover:shadow-[0_0_30px_rgba(59,130,246,0.25)]"
            onClick={() => { window.location.href = '/projects'; }}
          >
            <span>View All Projects</span>
            <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Button>
        </motion.div>
      </Container>
    </section>
  );
}
