/**
 * Renders a multi-line description string properly.
 *
 * Splits on newlines, trims each line, removes leading bullet characters
 * (•, -, *) so the admin can write either plain sentences or bullet lists
 * and both look correct on the frontend.
 *
 * If only one line exists it renders as a <p>.
 * If multiple lines exist it renders as a <ul> with styled bullets.
 */

interface Props {
  text: string | null | undefined;
  className?: string;
}

export default function DescriptionLines({ text, className = '' }: Props) {
  if (!text?.trim()) return null;

  const lines = text
    .split('\n')
    .map(l => l.trim().replace(/^[•\-*]\s*/, ''))
    .filter(Boolean);

  if (lines.length === 0) return null;

  if (lines.length === 1) {
    return (
      <p className={`text-sm leading-6 text-[var(--color-text-secondary)] ${className}`}>
        {lines[0]}
      </p>
    );
  }

  return (
    <ul className={`flex flex-col gap-1.5 ${className}`}>
      {lines.map((line, i) => (
        <li key={i} className="flex items-start gap-2 text-sm leading-6 text-[var(--color-text-secondary)]">
          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-accent-blue)]" />
          {line}
        </li>
      ))}
    </ul>
  );
}
