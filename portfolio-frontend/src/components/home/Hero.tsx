import { Github, Linkedin, Mail, ImageIcon } from 'lucide-react';
import { motion } from 'framer-motion';

import Container from '../common/Container';
import Badge from '../common/Badge';
import Button from '../common/Button';
import { usePortfolio } from '../../hooks/usePortfolio';
import { mediaUrl } from '../../lib/mediaUrl';
import { pdfUrl } from '../../lib/pdfUrl';

export default function Hero() {
  const { data: portfolio } = usePortfolio();

  // Build social links from portfolio data, fall back to hardcoded defaults
  const socials = [
    portfolio?.github && {
      icon: Github,
      href: portfolio.github,
      label: 'GitHub',
    },
    portfolio?.linkedin && {
      icon: Linkedin,
      href: portfolio.linkedin,
      label: 'LinkedIn',
    },
    portfolio?.email && {
      icon: Mail,
      href: `mailto:${portfolio.email}`,
      label: 'Email',
    },
  ].filter(Boolean) as { icon: typeof Github; href: string; label: string }[];

  // Fall back to hardcoded values when backend has no data yet
  const fallbackSocials = [
    { icon: Github, href: 'https://github.com/BhavyaAgrawa12', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/bhavya-agrawal-212052291', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:agrawalbhavya563@gmail.com', label: 'Email' },
  ];

  const displaySocials = socials.length > 0 ? socials : fallbackSocials;

  const heroTitle = portfolio?.heroTitle ?? 'Hi, I\'m Bhavya Agrawal';
  const heroSubtitle = portfolio?.heroSubtitle ?? 'Computer Science Student • Full Stack Developer • Backend Developer';
  const heroDescription =
    portfolio?.heroDescription ??
    "I'm a Computer Science student passionate about building scalable web applications, backend systems, and modern digital experiences. I enjoy transforming ideas into production-ready software while continuously learning new technologies and solving real-world problems.";

  const resumeUrl = portfolio?.resume
    ? mediaUrl(portfolio.resume.fileUrl)
    : '/resume.pdf';

  const workspaceImageUrl = mediaUrl(portfolio?.workspaceImage?.fileUrl);

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const downloadResume = () => {
    window.open(resumeUrl, '_blank');
  };

  return (
    <section className="relative overflow-hidden pt-6 pb-24 lg:pt-8">
      {/* Background Glow */}
      <div className="pointer-events-none absolute -top-32 left-1/4 h-96 w-96 rounded-full bg-accent-purple/20 blur-[120px]" />
      <div className="pointer-events-none absolute top-0 right-1/4 h-80 w-80 rounded-full bg-accent-blue/20 blur-[120px]" />

      <Container className="relative grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr]">
        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col"
        >
          <Badge>Available for Opportunities</Badge>

          <h1 className="mt-8 text-5xl font-black leading-[1.05] tracking-tight lg:text-6xl xl:text-7xl">
            <span className="text-gradient">{heroTitle}</span>
          </h1>

          <p className="mt-6 text-lg font-medium text-text-secondary">
            {heroSubtitle}
          </p>

          <p className="mt-8 max-w-xl leading-8 text-text-secondary">
            {heroDescription}
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Button variant="primary" onClick={scrollToProjects}>
              View Projects
            </Button>
            <Button variant="outline" onClick={downloadResume}>
              Download Resume
            </Button>
          </div>

          <div className="mt-10 flex items-center gap-5">
            {displaySocials.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="rounded-xl border border-white/10 bg-white/5 p-3 text-[var(--color-text-secondary)] transition-all duration-300 hover:border-[var(--color-accent-blue)] hover:text-white hover:shadow-lg hover:shadow-cyan-500/10"
              >
                <Icon size={20} />
              </a>
            ))}
          </div>
        </motion.div>

        {/* RIGHT — Workspace image or placeholder */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="glass relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-3xl border border-white/10"
        >
          {workspaceImageUrl ? (
            <img
              src={workspaceImageUrl}
              alt="Workspace"
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="text-center text-[var(--color-text-secondary)]">
              <ImageIcon size={32} className="mx-auto mb-3" />
              <p className="text-sm">Workspace image — upload from Admin Panel</p>
            </div>
          )}
        </motion.div>
      </Container>
    </section>
  );
}
