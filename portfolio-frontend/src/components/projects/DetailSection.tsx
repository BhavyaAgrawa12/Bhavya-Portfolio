interface DetailSectionProps {
  title: string;
  children: React.ReactNode;
}

export default function DetailSection({
  title,
  children,
}: DetailSectionProps) {
  return (
    <section className="mt-16">
      <h2 className="mb-6 text-3xl font-bold">
        {title}
      </h2>

      {children}
    </section>
  );
}