import type { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  dotColor?: string;
  className?: string;
}

export default function Badge({ children, dotColor = 'bg-emerald-400', className = '' }: BadgeProps) {
  return (
    <span
      className={`glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm text-[var(--color-text-secondary)] ${className}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${dotColor}`} />
      {children}
    </span>
  );
}
