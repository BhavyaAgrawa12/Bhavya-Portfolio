interface Props {
  message?: string;
}

export default function LoadingSpinner({ message = 'Loading…' }: Props) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-16 text-[var(--color-text-secondary)]">
      <span className="h-8 w-8 animate-spin rounded-full border-2 border-[var(--color-accent-blue)] border-t-transparent" />
      <p className="text-sm">{message}</p>
    </div>
  );
}
