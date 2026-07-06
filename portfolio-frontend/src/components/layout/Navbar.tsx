import { Sun, Moon, Menu, X } from 'lucide-react';
import { useState } from 'react';
import Container from '../common/Container';
import Button from '../common/Button';
import { usePortfolio } from '../../hooks/usePortfolio';
import { useTheme } from '../../context/ThemeContext';
import { mediaUrl } from '../../lib/mediaUrl';
import { pdfUrl } from '../../lib/pdfUrl';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Projects', to: '/projects' },
  { label: 'Experience', to: '/experience' },
  { label: 'Contact', to: '/contact' },
];

export default function Navbar() {
  const { isDark, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const { data: portfolio } = usePortfolio();

  // Resume: prefer the PDF uploaded via admin, fall back to the static file
  const resumeUrl = portfolio?.resume
    ? pdfUrl(mediaUrl(portfolio.resume.fileUrl) ?? '/resume.pdf')
    : '/resume.pdf';

  const openResume = () => window.open(resumeUrl, '_blank', 'noopener,noreferrer');

  return (
    <header className="sticky top-0 z-50 border-b border-white/6 bg-[var(--color-bg-base)]/80 backdrop-blur-xl">
      <Container className="flex h-16 items-center justify-between gap-4">
        <a href="/" className="flex items-center">
          <img src="/logo.png" alt="BA Logo" className="h-9 w-auto" />
        </a>

        <div className="flex items-center gap-3 md:gap-4">
          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.to}
                href={link.to}
                className="text-sm text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text-primary)]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <Button
            variant="outline"
            className="hidden md:inline-flex"
            onClick={openResume}
          >
            View Resume
          </Button>

          {/* Theme toggle — actually works now */}
          <button
            onClick={toggleTheme}
            className="glass flex h-9 w-9 items-center justify-center rounded-full text-[var(--color-text-secondary)] transition-all duration-300 hover:text-[var(--color-text-primary)]"
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-[var(--color-bg-muted)] text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text-primary)] md:hidden"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </Container>

      {/* Mobile menu */}
      <div
        className={`md:hidden ${menuOpen ? 'max-h-[480px]' : 'max-h-0'} overflow-hidden border-t border-white/10 bg-[var(--color-bg-base)]/95 transition-[max-height] duration-300 ease-out`}
      >
        <div className="space-y-4 px-5 py-5">
          {navLinks.map((link) => (
            <a
              key={link.to}
              href={link.to}
              className="block rounded-2xl px-4 py-3 text-base font-medium text-[var(--color-text-secondary)] transition-colors hover:bg-white/5 hover:text-[var(--color-text-primary)]"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}

          <Button
            variant="outline"
            className="w-full"
            onClick={() => { openResume(); setMenuOpen(false); }}
          >
            View Resume
          </Button>
        </div>
      </div>
    </header>
  );
}
