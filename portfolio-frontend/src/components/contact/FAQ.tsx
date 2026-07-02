import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import SectionTitle from '../common/SectionTitle';
import GlassCard from '../common/GlassCard';

const faqs = [
  { q: 'What is your typical project timeline?', a: 'Timelines vary by scope, but most engagements run between a few weeks and a few months depending on complexity.' },
  { q: 'What technologies do you specialize in?', a: 'React, Node.js, Express, Prisma, and MySQL, with a focus on clean backend architecture.' },
  { q: 'Do you work remotely?', a: 'Yes, I work remotely and collaborate with distributed teams.' },
  { q: 'What is needed to get something started?', a: 'A short brief outlining goals, scope, and timeline is enough to start a conversation.' },
  { q: 'How can I request a quote?', a: 'Reach out through the contact form or email with your project details and I will follow up with an estimate.' },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="flex flex-col gap-6">
      <SectionTitle eyebrow="FAQ" title="Frequently Asked Questions" align="left" />

      <div className="flex flex-col gap-3">
        {faqs.map((faq, i) => {
          const isOpen = openIndex === i;
          return (
            <GlassCard key={faq.q} hover={false} className="cursor-pointer" >
              <button
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 text-left"
              >
                <span className="font-medium">{faq.q}</span>
                <ChevronDown
                  size={18}
                  className={`shrink-0 text-[var(--color-text-secondary)] transition-transform ${isOpen ? 'rotate-180' : ''}`}
                />
              </button>
              {isOpen && (
                <p className="mt-3 text-sm text-[var(--color-text-secondary)]">{faq.a}</p>
              )}
            </GlassCard>
          );
        })}
      </div>
    </div>
  );
}
