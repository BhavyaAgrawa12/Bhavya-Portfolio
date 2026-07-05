import { useState, type FormEvent } from 'react';
import { Github, Linkedin, Mail, FileText } from 'lucide-react';

import Container from '../components/common/Container';
import GlassCard from '../components/common/GlassCard';
import Button from '../components/common/Button';
import FAQ from '../components/contact/FAQ';
import { submitContact } from '../api/contact.api';
import { usePortfolio } from '../hooks/usePortfolio';
import { useToast } from '../context/ToastContext';

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const EMPTY_FORM: FormState = { name: '', email: '', subject: '', message: '' };

export default function Contact() {
  const { data: portfolio } = usePortfolio();
  const { showToast } = useToast();

  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [submitting, setSubmitting] = useState(false);

  // Build contact cards dynamically from portfolio data
  const email = portfolio?.email ?? 'agrawalbhavya563@gmail.com';
  const github = portfolio?.github ?? 'https://github.com/BhavyaAgrawa12';
  const linkedin = portfolio?.linkedin ?? 'https://www.linkedin.com/in/bhavya-agrawal-212052291';
  const resumeUrl = portfolio?.resume?.fileUrl
    ? `${import.meta.env.VITE_UPLOADS_BASE_URL}${portfolio.resume.fileUrl}`
    : '/resume.pdf';

  const contactCards = [
    { icon: Mail, label: 'Email', value: email, href: `mailto:${email}` },
    { icon: Github, label: 'GitHub', value: 'github.com/BhavyaAgrawa12', href: github },
    { icon: Linkedin, label: 'LinkedIn', value: 'LinkedIn Profile', href: linkedin },
    { icon: FileText, label: 'Resume', value: 'Download Resume', href: resumeUrl },
  ];

  const validate = (): boolean => {
    const e: Partial<FormState> = {};
    if (!form.name.trim() || form.name.trim().length < 2) e.name = 'Name must be at least 2 characters.';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Please enter a valid email.';
    if (!form.message.trim() || form.message.trim().length < 10) e.message = 'Message must be at least 10 characters.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      await submitContact({
        name: form.name.trim(),
        email: form.email.trim(),
        subject: form.subject.trim() || undefined,
        message: form.message.trim(),
      });
      showToast("Message sent! I'll get back to you soon.", 'success');
      setForm(EMPTY_FORM);
      setErrors({});
    } catch (err: unknown) {
      const msg =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ??
        'Something went wrong. Please try again.';
      showToast(msg, 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const field = (key: keyof FormState) => ({
    value: form[key],
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((prev) => ({ ...prev, [key]: e.target.value })),
  });

  return (
    <Container className="py-20">
      <div className="grid gap-10 lg:grid-cols-2">
        {/* Left — Info */}
        <div>
          <h1 className="text-4xl font-bold sm:text-5xl">
            Let's Build Something Great Together
          </h1>
          <p className="mt-4 max-w-md text-[var(--color-text-secondary)]">
            Open for internships, freelance work, and collaboration on interesting backend problems.
          </p>
          <Button
            variant="primary"
            className="mt-6"
            onClick={() => (window.location.href = `mailto:${email}`)}
          >
            Start a Conversation
          </Button>

          <div className="mt-10 grid grid-cols-2 gap-4">
            {contactCards.map(({ icon: Icon, label, value, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="block"
              >
                <GlassCard className="flex flex-col gap-2 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-accent-blue)]/40">
                  <Icon size={18} className="text-[var(--color-accent-blue)]" />
                  <span className="font-semibold">{label}</span>
                  <span className="text-sm text-[var(--color-text-secondary)] break-all">{value}</span>
                </GlassCard>
              </a>
            ))}
          </div>
        </div>

        {/* Right — Form */}
        <GlassCard className="flex flex-col gap-4 self-start">
          <h2 className="text-xl font-semibold">Reach Out</h2>

          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
            <div>
              <input
                placeholder="Name"
                aria-label="Name"
                autoComplete="name"
                {...field('name')}
                className="glass w-full rounded-lg px-4 py-2.5 text-sm outline-none placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-accent-blue)]"
              />
              {errors.name && (
                <p className="mt-1 text-xs text-red-400">{errors.name}</p>
              )}
            </div>

            <div>
              <input
                placeholder="Email"
                aria-label="Email"
                type="email"
                autoComplete="email"
                {...field('email')}
                className="glass w-full rounded-lg px-4 py-2.5 text-sm outline-none placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-accent-blue)]"
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-400">{errors.email}</p>
              )}
            </div>

            <input
              placeholder="Subject (optional)"
              aria-label="Subject"
              {...field('subject')}
              className="glass rounded-lg px-4 py-2.5 text-sm outline-none placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-accent-blue)]"
            />

            <div>
              <textarea
                placeholder="Message"
                aria-label="Message"
                rows={5}
                {...field('message')}
                className="glass w-full rounded-lg px-4 py-2.5 text-sm outline-none placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-accent-blue)]"
              />
              {errors.message && (
                <p className="mt-1 text-xs text-red-400">{errors.message}</p>
              )}
            </div>

            <Button variant="primary" type="submit" disabled={submitting}>
              {submitting ? 'Sending…' : 'Send Message'}
            </Button>
          </form>
        </GlassCard>
      </div>

      <div className="mt-20">
        <FAQ />
      </div>
    </Container>
  );
}
