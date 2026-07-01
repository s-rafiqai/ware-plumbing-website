import type { ComponentType, SVGProps } from "react";
import { Award, Building2, Wrench } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { TRUST_BADGES, type TrustIconName } from "@/content/trust";

const ICONS: Record<TrustIconName, ComponentType<SVGProps<SVGSVGElement>>> = {
  award: Award,
  building: Building2,
  wrench: Wrench,
};

/** Three trust badges shown just below the hero. */
export function TrustBadges() {
  return (
    <Section className="py-8 md:py-10 lg:py-12">
      <ul className="grid gap-6 sm:grid-cols-3">
        {TRUST_BADGES.map((badge) => {
          const Icon = ICONS[badge.icon];
          return (
            <li key={badge.title} className="flex gap-4">
              <span className="grid size-11 shrink-0 place-items-center rounded-sm bg-blue-tint text-blue">
                <Icon aria-hidden className="size-6" />
              </span>
              <div>
                <h3 className="text-h3 text-ink">{badge.title}</h3>
                <p className="mt-1 text-body text-ink-soft text-pretty">
                  {badge.description}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
