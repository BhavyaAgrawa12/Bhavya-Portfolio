import { ImageIcon } from 'lucide-react';
import { motion } from 'framer-motion';

import Container from '../common/Container';
import Button from '../common/Button';
import GlassCard from '../common/GlassCard';
import { usePortfolio } from '../../hooks/usePortfolio';
import { mediaUrl } from '../../lib/mediaUrl';
import { fadeUp, slideLeft, slideRight, staggerContainer, staggerItem, VIEWPORT } from '../../lib/motion';

const stats = [
  { value: '10+', label: 'Projects Built' },
  { value: '20+', label: 'Technologies' },
  { value: '3+', label: 'Years Learning' },
];

export default function AboutPreview() {
  const { data: portfolio } = usePortfolio();

  const profileImageUrl = mediaUrl(portfolio?.profileImage?.fileUrl);
  const aboutTitle = portfolio?.aboutTitle ?? 'Passionate About Building Modern Software';
  const aboutDescription =
    portfolio?.aboutDescription ??
    "I'm Bhavya Agrawal, a Computer Science student and Full Stack Developer passionate about building scalable web applications, backend systems, and modern digital experiences.\n\nI enjoy transforming ideas into production-ready software while continuously learning new technologies, software architecture, cloud computing, and backend engineering.";

  return (
    <section id="about" className="relative py-24">
      <Container className="grid items-center gap-16 lg:grid-cols-2">
        {/* Profile Image */}
        <motion.div
          variants={slideLeft}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
        >
          <GlassCard className="group flex aspect-[4/5] w-full max-w-sm items-center justify-center overflow-hidden rounded-3xl transition-all duration-500 hover:scale-[1.02] hover:border-[var(--color-accent-blue)]/40">
            {profileImageUrl ? (
              <img src={profileImageUrl} alt="Profile" className="h-full w-full object-cover" />
            ) : (
              <div className="text-center text-[var(--color-text-secondary)]">
                <ImageIcon size={32} className="mx-auto mb-3" />
                <p className="text-sm">Profile image — upload from Admin Panel</p>
              </div>
            )}
          </GlassCard>
        </motion.div>

        {/* Text */}
        <motion.div
          variants={slideRight}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-[var(--color-accent-blue)]">
            ABOUT ME
          </p>

          <h2 className="text-4xl font-bold leading-tight lg:text-5xl">{aboutTitle}</h2>

          <div className="mt-6 max-w-xl leading-8 text-[var(--color-text-secondary)]">
            {aboutDescription.split('\n\n').map((para, i) => (
              <p key={i} className={i > 0 ? 'mt-4' : ''}>{para}</p>
            ))}
          </div>

          {/* Stats — staggered */}
          <motion.div
            variants={staggerContainer(0.1, 0.2)}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-3"
          >
            {stats.map((stat) => (
              <motion.div key={stat.label} variants={staggerItem}>
                <GlassCard
                  hover={false}
                  className="group p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-accent-blue)]/40"
                >
                  <span className="block text-3xl font-bold text-[var(--color-accent-blue)] transition-transform duration-300 group-hover:scale-110">
                    {stat.value}
                  </span>
                  <span className="mt-2 block text-sm text-[var(--color-text-secondary)]">
                    {stat.label}
                  </span>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>

          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={VIEWPORT}>
            <Button
              variant="outline"
              className="group mt-10 transition-all duration-300 hover:border-[var(--color-accent-blue)] hover:bg-[var(--color-accent-blue)]/10 hover:shadow-[0_0_30px_rgba(59,130,246,0.25)]"
            onClick={() => { window.location.href = '/experience'; }}
            >
              <span>Explore My Journey</span>
              <span className="ml-2 transition-all duration-300 group-hover:translate-x-2">→</span>
            </Button>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
