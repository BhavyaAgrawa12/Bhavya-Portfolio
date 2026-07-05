import { useState, useRef, useEffect, type ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';

interface Props {
  label: string;
  error?: string;
  required?: boolean;
  children: ReactNode;
  hint?: string;
}

export default function FormField({ label, error, required, children, hint }: Props) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-[var(--color-text-primary)]">
        {label}
        {required && <span className="ml-1 text-red-400">*</span>}
      </label>
      {children}
      {hint && <p className="text-xs text-[var(--color-text-muted)]">{hint}</p>}
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}

/* ── Input ─────────────────────────────────────────────────────── */
export function AdminInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`
        w-full rounded-xl border border-[var(--color-glass-border)]
        bg-[var(--color-bg-elevated)] px-4 py-2.5 text-sm
        text-[var(--color-text-primary)]
        placeholder:text-[var(--color-text-muted)]
        outline-none transition
        focus:border-[var(--color-accent-blue)]
        ${props.className ?? ''}
      `}
    />
  );
}

/* ── Textarea ───────────────────────────────────────────────────── */
export function AdminTextarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={`
        w-full rounded-xl border border-[var(--color-glass-border)]
        bg-[var(--color-bg-elevated)] px-4 py-2.5 text-sm
        text-[var(--color-text-primary)]
        placeholder:text-[var(--color-text-muted)]
        outline-none transition
        focus:border-[var(--color-accent-blue)]
        ${props.className ?? ''}
      `}
    />
  );
}

/* ── Custom Select ──────────────────────────────────────────────── */
/**
 * Replaces the native <select> which uses OS-default styling
 * (white background, black text) that ignores CSS variables.
 * This custom version respects both dark and light themes.
 */
export interface SelectOption {
  value: string;
  label: string;
}

interface AdminSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export function AdminSelect({
  value,
  onChange,
  options,
  placeholder = 'Select…',
  className = '',
  disabled = false,
}: AdminSelectProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open]);

  const selected = options.find((o) => o.value === value);

  return (
    <div ref={ref} className={`relative ${className}`}>
      {/* Trigger */}
      <button
        type="button"
        onClick={() => !disabled && setOpen((o) => !o)}
        disabled={disabled}
        className={`
          flex w-full items-center justify-between gap-2
          rounded-xl border border-[var(--color-glass-border)]
          bg-[var(--color-bg-elevated)] px-4 py-2.5 text-sm
          text-[var(--color-text-primary)] outline-none transition
          hover:border-[var(--color-accent-blue)]
          ${open ? 'border-[var(--color-accent-blue)]' : ''}
          ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
        `}
      >
        <span className={selected ? '' : 'text-[var(--color-text-muted)]'}>
          {selected ? selected.label : placeholder}
        </span>
        <ChevronDown
          size={16}
          className={`shrink-0 text-[var(--color-text-muted)] transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Dropdown panel */}
      {open && (
        <div
          className="
            absolute z-50 mt-1.5 w-full overflow-hidden
            rounded-xl border border-[var(--color-glass-border)]
            bg-[var(--color-bg-elevated)] shadow-2xl
          "
          style={{ backdropFilter: 'blur(16px)' }}
        >
          {options.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => { onChange(opt.value); setOpen(false); }}
              className={`
                block w-full px-4 py-2.5 text-left text-sm transition
                hover:bg-[var(--color-accent-blue)]/10 hover:text-[var(--color-accent-blue)]
                ${opt.value === value
                  ? 'bg-[var(--color-accent-blue)]/15 font-medium text-[var(--color-accent-blue)]'
                  : 'text-[var(--color-text-primary)]'
                }
              `}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Action buttons ─────────────────────────────────────────────── */
export function ActionButtons({
  onEdit,
  onDelete,
}: {
  onEdit?: () => void;
  onDelete?: () => void;
}) {
  return (
    <div className="flex items-center gap-2">
      {onEdit && (
        <button
          onClick={onEdit}
          className="rounded-lg px-3 py-1.5 text-xs font-medium text-[var(--color-accent-blue)] transition hover:bg-[var(--color-accent-blue)]/10"
        >
          Edit
        </button>
      )}
      {onDelete && (
        <button
          onClick={onDelete}
          className="rounded-lg px-3 py-1.5 text-xs font-medium text-red-400 transition hover:bg-red-500/10"
        >
          Delete
        </button>
      )}
    </div>
  );
}
