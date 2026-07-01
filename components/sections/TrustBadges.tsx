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

/** A slim, divided trust strip below the hero — deliberately not a card grid. */
export function TrustBadges() {
  return (
    <Section space="tight" className="border-b border-line">
      <RevealGroup
        as="ul"
        stagger={0.1}
        className="grid gap-8 sm:grid-cols-3 sm:gap-0"
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
