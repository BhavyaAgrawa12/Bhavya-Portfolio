import { ImageIcon } from 'lucide-react';
import { motion } from 'framer-motion';

import Container from '../common/Container';
import Badge from '../common/Badge';
import Button from '../common/Button';
import { usePortfolio } from '../../hooks/usePortfolio';
import { mediaUrl } from '../../lib/mediaUrl';

export default function AboutHero() {
  const { data: portfolio } = usePortfolio();

  const profileImageUrl = mediaUrl(portfolio?.profileImage?.fileUrl);
  const resumeUrl = portfolio?.resume
    ? mediaUrl(portfolio.resume.fileUrl)
    : '/resume.pdf';

  return (
    <section className="relative overflow-hidden pt-10 pb-24">
      <div className="pointer-events-none absolute -top-20 left-1/3 h-80 w-80 rounded-full bg-[var(--color-accent-purple)]/20 blur-[120px]" />

      <Container className="relative grid items-start gap-16 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col"
        >
          <Badge>Computer Science Student • Full Stack Developer</Badge>

          <h1 className="mt-5 text-5xl font-black leading-[1.05] tracking-tight sm:text-6xl">
            Building Modern
            <br />
            <span className="text-gradient">Software.</span>
          </h1>

          <p className="mt-6 max-w-xl leading-8 text-[var(--color-text-secondary)]">
            {portfolio?.aboutDescription ??
              "I'm Bhavya Agrawal, a Computer Science student and Full Stack Developer passionate about building scalable web applications, backend systems, and clean digital experiences. I enjoy solving real-world problems through software while continuously learning modern technologies, software architecture, and best engineering practices."}
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Button
              variant="primary"
              onClick={() => { window.location.href = '/experience'; }}
            >
              My Journey
            </Button>
            <Button
              variant="outline"
              onClick={() => window.open(resumeUrl, '_blank')}
            >
              Download Resume
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="glass mx-auto flex aspect-[4/5] w-full max-w-sm items-center justify-center overflow-hidden rounded-3xl"
        >
          {profileImageUrl ? (
            <img
              src={profileImageUrl}
              alt="Profile"
              className="h-full w-full object-cover"
            />
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
