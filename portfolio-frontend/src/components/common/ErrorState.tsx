import GlassCard from './GlassCard';
import Button from './Button';

interface Props {
  message?: string;
  onRetry?: () => void;
}

export default function ErrorState({
  message = 'Something went wrong. Please try again.',
  onRetry,
}: Props) {
  return (
    <GlassCard className="flex flex-col items-center gap-4 py-16 text-center">
      <p className="text-[var(--color-text-secondary)]">{message}</p>
      {onRetry && (
        <Button variant="outline" onClick={onRetry}>
          Retry
        </Button>
      )}
    </GlassCard>
  );
}
