import type { ComponentType, SVGProps } from "react";
import { Award, Building2, Wrench } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { TRUST_BADGES, type TrustIconName } from "@/content/trust";
import { cn } from "@/lib/cn";

const ICONS: Record<TrustIconName, ComponentType<SVGProps<SVGSVGElement>>> = {
  award: Award,
  building: Building2,
  wrench: Wrench,
};

/**
 * Trust strip below the hero — a lifted panel that overlaps the hero's bottom
 * edge (depth seam #1) so the page opens with a layered composition rather than
 * flat stacked bands. Layered shadow + cool sheen read it as a raised surface.
 */
export function TrustBadges() {
  return (
    <Section space="tight" className="relative z-10">
      <RevealGroup
        as="ul"
        stagger={0.1}
        className="-mt-12 grid gap-8 rounded-md border border-line surface-sheen p-6 shadow-lg sm:-mt-20 sm:grid-cols-3 sm:gap-0 sm:p-8"
      >
        {TRUST_BADGES.map((badge, i) => {
          const Icon = ICONS[badge.icon];
          return (
            <RevealItem
              as="li"
              key={badge.title}
              className={cn(
                "flex items-start gap-3.5",
                i > 0 && "sm:border-l sm:border-line sm:pl-8",
              )}
            >
              <Icon aria-hidden className="mt-0.5 size-5 shrink-0 text-blue" />
              <div>
                <h3 className="text-body font-semibold text-ink">{badge.title}</h3>
                <p className="mt-0.5 text-small text-ink-soft text-pretty">
                  {badge.description}
                </p>
              </div>
            </RevealItem>
          );
        })}
      </RevealGroup>
    </Section>
  );
}
