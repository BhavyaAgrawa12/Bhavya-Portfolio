import type { ReactNode, MouseEventHandler } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

export default function GlassCard({ children, className = '', hover = true, onClick }: GlassCardProps) {
  return (
    <div
      onClick={onClick}
      className={`glass rounded-2xl p-6 transition-colors duration-300 ${
        hover ? 'hover:bg-white/[0.06]' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
}
