import { Sun, Moon, Menu, X } from "lucide-react";
import { useState } from "react";
import Container from "../common/Container";
import Button from "../common/Button";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Projects", to: "/projects" },
  { label: "Experience", to: "/experience" },
  { label: "Contact", to: "/contact" },
];

export default function Navbar() {
  const [isDark, setIsDark] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  const downloadResume = () => {
    window.open("/resume.pdf", "_blank");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/6 bg-bg-base/80 backdrop-blur-xl">
      <Container className="flex h-16 items-center justify-between gap-4">
        <span className="text-lg font-bold tracking-tight">BA Logo</span>

        <div className="flex items-center gap-3 md:gap-4">
          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.to}
                href={link.to}
                className="text-sm text-text-secondary transition-colors hover:text-text-primary"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <Button
            variant="outline"
            className="hidden md:inline-flex"
            onClick={downloadResume}
          >
            Download Resume
          </Button>

          <button
            onClick={() => setIsDark((prev) => !prev)}
            className="glass flex h-9 w-9 items-center justify-center rounded-full text-text-secondary hover:text-text-primary"
            aria-label="Toggle theme"
          >
            {isDark ? <Moon size={16} /> : <Sun size={16} />}
          </button>

          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-bg-muted text-text-secondary transition-colors hover:text-text-primary md:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </Container>

      <div
        className={`md:hidden ${menuOpen ? "max-h-[480px]" : "max-h-0"} overflow-hidden border-t border-white/10 bg-bg-base/95 transition-[max-height] duration-300 ease-out`}
      >
        <div className="space-y-4 px-5 py-5">
          {navLinks.map((link) => (
            <a
              key={link.to}
              href={link.to}
              className="block rounded-2xl px-4 py-3 text-base font-medium text-text-secondary transition-colors hover:bg-white/5 hover:text-text-primary"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}

          <Button
            variant="outline"
            className="w-full"
            onClick={() => {
              downloadResume();
              setMenuOpen(false);
            }}
          >
            Download Resume
          </Button>
        </div>
      </div>
    </header>
  );
}
