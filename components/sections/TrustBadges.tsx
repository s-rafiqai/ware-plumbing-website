import type { ComponentType, SVGProps } from "react";
import { Award, Building2, Clock, Wrench } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { TRUST_BADGES, type TrustIconName } from "@/content/trust";
import { cn } from "@/lib/cn";

const ICONS: Record<TrustIconName, ComponentType<SVGProps<SVGSVGElement>>> = {
  award: Award,
  building: Building2,
  wrench: Wrench,
  clock: Clock,
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
        className="-mt-12 grid gap-8 rounded-md border border-line surface-sheen p-6 shadow-lg sm:-mt-20 md:grid-cols-2 md:gap-0 md:p-8 lg:grid-cols-4"
      >
        {TRUST_BADGES.map((badge, i) => {
          const Icon = ICONS[badge.icon];
          return (
            <RevealItem
              as="li"
              key={badge.title}
              className={cn(
                "flex items-start gap-3.5",
                // Dividers track the grid at each breakpoint (gap-0 from md up):
                // — vertical between columns, — horizontal only between the two
                // tablet rows (canceled once it's a single 4-col row at lg).
                // 2-col (md): right column (odd index) gets a left divider.
                i % 2 === 1 && "md:border-l md:border-line md:pl-8",
                // 4-col (lg): the 3rd item becomes an inner column too.
                i === 2 && "lg:border-l lg:border-line lg:pl-8",
                // 2nd tablet row gets a top divider; removed at lg (one row).
                i >= 2 &&
                  "md:border-t md:border-line md:pt-8 lg:border-t-0 lg:pt-0",
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
