import { Github, Linkedin, Mail, Twitter } from 'lucide-react';
import Container from '../common/Container';
import { usePortfolio } from '../../hooks/usePortfolio';

const quickLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Projects', to: '/projects' },
  { label: 'Contact', to: '/contact' },
];

export default function Footer() {
  const { data: portfolio } = usePortfolio();

  const socials = [
    portfolio?.github && { icon: Github, href: portfolio.github, label: 'GitHub' },
    portfolio?.linkedin && { icon: Linkedin, href: portfolio.linkedin, label: 'LinkedIn' },
    portfolio?.email && { icon: Mail, href: `mailto:${portfolio.email}`, label: 'Email' },
    portfolio?.x && { icon: Twitter, href: portfolio.x, label: 'X / Twitter' },
  ].filter(Boolean) as { icon: typeof Github; href: string; label: string }[];

  // Fallback when portfolio data isn't loaded yet
  const displaySocials = socials.length > 0
    ? socials
    : [
        { icon: Github, href: 'https://github.com/BhavyaAgrawa12', label: 'GitHub' },
        { icon: Linkedin, href: 'https://www.linkedin.com/in/bhavya-agrawal-212052291', label: 'LinkedIn' },
        { icon: Mail, href: 'mailto:agrawalbhavya563@gmail.com', label: 'Email' },
      ];

  const footerText =
    portfolio?.footerText ??
    'Full Stack Developer passionate about building scalable backend systems, modern web applications, and clean user experiences.';

  return (
    <footer className="border-t border-white/5 py-14">
      <Container>
        <div className="flex flex-col items-center justify-between gap-10 lg:flex-row">
          {/* Brand */}
          <div className="text-center lg:text-left">
            <h3 className="text-2xl font-bold">Bhavya Agrawal</h3>
            <p className="mt-3 max-w-sm leading-7 text-[var(--color-text-secondary)]">
              {footerText}
            </p>
          </div>

          {/* Navigation */}
          <nav className="flex flex-wrap justify-center gap-8">
            {quickLinks.map((link) => (
              <a
                key={link.to}
                href={link.to}
                className="text-[var(--color-text-secondary)] transition hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Socials */}
          <div className="flex gap-4">
            {displaySocials.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="glass flex h-11 w-11 items-center justify-center rounded-full text-[var(--color-text-secondary)] transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-accent-blue)] hover:text-white"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 text-sm text-[var(--color-text-muted)] sm:flex-row">
          <p>© {new Date().getFullYear()} Bhavya Agrawal. All rights reserved.</p>
          <p>Designed & Developed with React, TypeScript & Tailwind CSS.</p>
        </div>
      </Container>
    </footer>
  );
}
