import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  intro?: string;
}

/** Consistent page-level header (h1) for interior pages. */
export function PageHeader({ eyebrow, title, intro }: PageHeaderProps) {
  return (
    <Section as="header" className="border-b border-line lg:pt-24">
      <Reveal className="max-w-3xl">
        {eyebrow && (
          <p className="text-small font-semibold uppercase tracking-wide text-blue">
            {eyebrow}
          </p>
        )}
        <h1 className="mt-3 text-h1 text-ink sm:text-display text-balance">
          {title}
        </h1>
        {intro && (
          <p className="mt-5 text-lead text-ink-soft text-pretty">{intro}</p>
        )}
      </Reveal>
    </Section>
  );
}
