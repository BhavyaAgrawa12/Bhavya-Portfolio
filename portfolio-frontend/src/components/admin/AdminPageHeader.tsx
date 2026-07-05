interface Props {
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export default function AdminPageHeader({ title, description, action }: Props) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold">{title}</h1>
        {description && (
          <p className="mt-1 text-sm text-[var(--color-text-secondary)]">{description}</p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
