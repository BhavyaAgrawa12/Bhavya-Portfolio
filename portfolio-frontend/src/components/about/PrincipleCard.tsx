import type { LucideIcon } from 'lucide-react';
import GlassCard from '../common/GlassCard';

interface PrincipleCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  iconColor?: string;
}

export default function PrincipleCard({ icon: Icon, title, description, iconColor = 'text-[var(--color-accent-blue)]' }: PrincipleCardProps) {
  return (
    <GlassCard className="flex flex-col gap-3">
      <Icon size={28} className={iconColor} />
      <h3 className="font-semibold">{title}</h3>
      <p className="text-sm text-[var(--color-text-secondary)]">{description}</p>
    </GlassCard>
  );
}
