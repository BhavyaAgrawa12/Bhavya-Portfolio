interface SectionTitleProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
}

export default function SectionTitle({ eyebrow, title, subtitle, align = 'center' }: SectionTitleProps) {
  const alignment = align === 'center' ? 'text-center items-center' : 'text-left items-start';

  return (
    <div className={`flex flex-col gap-3 ${alignment}`}>
      {eyebrow && (
        <span className="text-sm font-medium uppercase tracking-wider text-[var(--color-accent-blue)]">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl sm:text-4xl font-bold text-[var(--color-text-primary)]">{title}</h2>
      {subtitle && (
        <p className="max-w-2xl text-[var(--color-text-secondary)]">{subtitle}</p>
      )}
    </div>
  );
}
