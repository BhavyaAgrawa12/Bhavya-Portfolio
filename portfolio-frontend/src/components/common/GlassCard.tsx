import type { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export default function GlassCard({ children, className = '', hover = true }: GlassCardProps) {
  return (
    <div
      className={`glass rounded-2xl p-6 transition-colors duration-300 ${
        hover ? 'hover:bg-white/[0.06]' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
}
