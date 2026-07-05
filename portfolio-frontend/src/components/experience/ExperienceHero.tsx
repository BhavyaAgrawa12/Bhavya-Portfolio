import { ImageIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import Container from '../common/Container';
import Badge from '../common/Badge';
import { usePortfolio } from '../../hooks/usePortfolio';
import { mediaUrl } from '../../lib/mediaUrl';

export default function ExperienceHero() {
  const { data: portfolio } = usePortfolio();
  const profileImageUrl = mediaUrl(portfolio?.profileImage?.fileUrl);
  const resumeUrl = portfolio?.resume
    ? (mediaUrl(portfolio.resume.fileUrl) ?? '/resume.pdf')
    : '/resume.pdf';

  return (
    <section className="relative overflow-hidden pt-16 pb-16 sm:pt-24">
      <div className="pointer-events-none absolute -top-20 right-1/3 h-80 w-80 rounded-full bg-[var(--color-accent-blue)]/20 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 left-1/4 h-64 w-64 rounded-full bg-[var(--color-accent-purple)]/15 blur-[100px]" />

      <Container className="relative grid items-center gap-12 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col"
        >
          <Badge>Full Stack Developer</Badge>
          <h1 className="mt-5 text-5xl font-black leading-[1.05] tracking-tight sm:text-6xl">
            My Engineering
            <br />
            <span className="text-gradient">Journey</span>
          </h1>
          <p className="mt-6 max-w-xl leading-8 text-[var(--color-text-secondary)]">
            From writing my first line of Python to building full-stack production applications —
            every step has been driven by curiosity, consistency, and a passion for software engineering.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <button
              onClick={() => window.open(resumeUrl, '_blank')}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[var(--color-accent-blue)] to-[var(--color-accent-purple)] px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
            >
              Download Resume
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="glass mx-auto flex aspect-[4/5] w-full max-w-sm items-center justify-center overflow-hidden rounded-3xl"
        >
          {profileImageUrl ? (
            <img src={profileImageUrl} alt="Profile" className="h-full w-full object-cover" />
          ) : (
            <div className="text-center text-[var(--color-text-secondary)]">
              <ImageIcon size={32} className="mx-auto mb-3" />
              <p className="text-sm">Upload profile image from Admin Panel</p>
            </div>
          )}
        </motion.div>
      </Container>
    </section>
  );
}
