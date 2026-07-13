import { motion } from 'framer-motion';
import Container from '../common/Container';
import Button from '../common/Button';
import { fadeUp, fadeScale, VIEWPORT } from '../../lib/motion';
import { usePortfolio } from '../../hooks/usePortfolio';
import { mediaUrl, isExternalUrl } from '../../lib/mediaUrl';
import { pdfUrl } from '../../lib/pdfUrl';

interface CTASectionProps {
  title?: string;
  subtitle?: string;
}

export default function CTASection({
  title = "Let's Build Something Great Together",
  subtitle = "I'm currently looking for internships, freelance opportunities, and exciting projects where I can build impactful software and continue growing as a Full Stack Developer.",
}: CTASectionProps) {
  const { data: portfolio } = usePortfolio();
  const email = portfolio?.email ?? 'agrawalbhavya563@gmail.com';
  // Resume: prefer external URL (Google Drive, etc.) stored in fileName, fall back to Cloudinary fileUrl, then static file
  const resumeUrl = portfolio?.resume
    ? (isExternalUrl(portfolio.resume.fileName) ? portfolio.resume.fileName : pdfUrl(mediaUrl(portfolio.resume.fileUrl) ?? '/resume.pdf'))
    : '/resume.pdf';

  return (
    <section id="contact" className="relative py-24">
      <Container>
        <motion.div
          variants={fadeScale}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="glass relative overflow-hidden rounded-3xl px-8 py-20 text-center"
        >
          <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-[var(--color-accent-blue)]/10 blur-[120px]" />

          <div className="relative">
            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT}
              className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-[var(--color-accent-blue)]"
            >
              LET'S CONNECT
            </motion.p>

            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT}
              className="text-4xl font-bold leading-tight sm:text-5xl"
            >
              {title}
            </motion.h2>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT}
              className="mx-auto mt-6 max-w-2xl leading-8 text-[var(--color-text-secondary)]"
            >
              {subtitle}
            </motion.p>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT}
              className="mt-10 flex flex-wrap justify-center gap-4"
            >
              <Button
                variant="primary"
                className="group"
                onClick={() => { window.location.href = `mailto:${email}?subject=%F0%9F%9A%80%20Project%20Enquiry%20%7C%20Bhavya%20Portfolio`; }}
              >
                Contact Me
                <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Button>

              <Button
                variant="outline"
                className="transition-all duration-300 hover:border-[var(--color-accent-blue)] hover:bg-[var(--color-accent-blue)]/10 hover:shadow-[0_0_30px_rgba(59,130,246,0.25)]"
                onClick={() => {
                  console.log('[CTASection] Resume URL opened:', resumeUrl);
                  window.open(resumeUrl, '_blank', 'noopener,noreferrer');
                }}
              >
                View Resume
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
