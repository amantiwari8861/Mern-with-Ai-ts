export default function PageHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="container mx-auto px-6 pt-10 text-center">
      {eyebrow && (
        <p className="text-sm uppercase tracking-[0.3em] text-(--secondary)">
          {eyebrow}
        </p>
      )}
      <h1 className="mt-2 text-3xl font-bold text-(--primary) sm:text-4xl">
        {title}
      </h1>
      {subtitle && (
        <p className="mx-auto mt-3 max-w-2xl text-gray-500">{subtitle}</p>
      )}
    </section>
  );
}
