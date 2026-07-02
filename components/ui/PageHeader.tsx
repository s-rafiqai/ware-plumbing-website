import { Section } from "@/components/ui/Section";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  intro?: string;
}

/**
 * Consistent page-level header (h1) for interior pages. Choreographed on load —
 * eyebrow and intro fade while the title plays a line/clip reveal, matching the
 * homepage SectionHeading treatment. Static under reduced motion.
 */
export function PageHeader({ eyebrow, title, intro }: PageHeaderProps) {
  return (
    <Section as="header" className="border-b border-line lg:pt-24">
      <RevealGroup className="max-w-3xl" stagger={0.08}>
        {eyebrow && (
          <RevealItem>
            <p className="text-small font-semibold uppercase tracking-wide text-blue">
              {eyebrow}
            </p>
          </RevealItem>
        )}
        <RevealItem variant="line">
          <h1 className="mt-3 text-h1 text-ink sm:text-display text-balance">
            {title}
          </h1>
        </RevealItem>
        {intro && (
          <RevealItem>
            <p className="mt-5 text-lead text-ink-soft text-pretty">{intro}</p>
          </RevealItem>
        )}
      </RevealGroup>
    </Section>
  );
}
