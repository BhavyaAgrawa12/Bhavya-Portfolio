import type { ButtonHTMLAttributes, ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: Variant;
}

const variantStyles: Record<Variant, string> = {
  primary:
    'bg-gradient-to-r from-[var(--color-accent-blue)] to-[var(--color-accent-purple)] text-[#0a0e16] font-semibold hover:opacity-90',
  secondary: 'bg-white text-[#0a0e16] font-semibold hover:bg-white/90',
  outline: 'glass text-[var(--color-text-primary)] hover:bg-white/[0.08]',
  ghost: 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]',
};

export default function Button({
  children,
  variant = 'primary',
  className = '',
  ...props
}: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm transition-all duration-200 cursor-pointer ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
