/**
 * Services — sourced from content brief §4 (verbatim copy, lightly cleaned to
 * Australian English and sentence case, obvious typos fixed, meaning kept).
 * `summary` is a card teaser written for this rebuild; `description` is the
 * full brief copy. `slug` is reserved for future per-service pages.
 *
 * `icon` is a string key mapped to a Lucide icon in the component layer, so
 * this data stays plain and CMS-portable.
 */

export type ServiceIconName =
  | "droplet"
  | "waves"
  | "shower"
  | "flame"
  | "thermometer"
  | "wrench"
  | "roof";

export interface Service {
  slug: string;
  title: string;
  summary: string;
  description: string;
  icon: ServiceIconName;
}

export const SERVICES: readonly Service[] = [
  {
    slug: "water-leaks",
    title: "Water leaks",
    summary:
      "Dripping taps and leaks fixed fast — before they mean water stains, damage and higher bills.",
    description:
      "When you've got a leaking tap in your kitchen or bathroom, you can hear the steady drip no matter what you're doing. Dripping taps can lead to water stains and, in the worst cases, even flooded bathrooms. It's extremely annoying, bad for the environment and can mean higher water bills. Our experienced Ware Plumbing technicians can make sure your taps are functioning correctly. Whether they're dripping, leaking around the handle, not opening completely to allow full water flow, or causing water hammer — we'll fix the problem.",
    icon: "droplet",
  },
  {
    slug: "drain-cleaning-cctv",
    title: "Drain cleaning & CCTV",
    summary:
      "High-pressure jetting and CCTV inspection to clear blockages and check the condition of your drains.",
    description:
      "Clearing blocked drains often needs more than just a plunger. A specialist drain clean using a high-pressure jet will clear your drain of any foreign debris, ensuring it flows efficiently and preventing costly damage. Our fully equipped vans are fitted with the latest technology, including high-pressure water jet and electric eel/snake cleaning equipment to blast and flush away blockages quickly and efficiently. Our plumbers are specialists in clearing all types of blockages, including grease build-up, tree roots, silt and other debris. Noticed an issue with your drain? Or maybe you're buying a new home and want to make sure you aren't inheriting costly plumbing problems? A CCTV drain inspection is the only non-invasive way to accurately assess the condition of your drains.",
    icon: "waves",
  },
  {
    slug: "taps-toilet-repairs",
    title: "Taps & toilet repairs",
    summary:
      "Fast repairs for running, blocked or broken toilets and taps — with honest, upfront quotes.",
    description:
      "Of all the breakdowns that might happen in your house, a toilet failing is probably the most inconvenient — and trying to fix it yourself isn't fun. Toilet cisterns involve a number of moving parts, and where there are moving parts, there is maintenance involved. A broken toilet can be a massive nuisance, but there's no need to put up with it. Our local Ware Plumbing technicians can quickly carry out any repairs and get your toilet running perfectly again. If it needs to be replaced, they'll provide you with an upfront and honest quote.",
    icon: "shower",
  },
  {
    slug: "gas-fitting-repairs",
    title: "Gas fitting & repairs",
    summary:
      "Safe, licensed gas fitting, servicing and repairs — from quoting through to completion.",
    description:
      "If electrical appliances aren't meeting your home's standards, gas alternatives are another popular option. There are many reasons you might consider using gas in your household. Ware Plumbing, in Melbourne's South East, understands every aspect of gas fitting — from quoting through to completion. Our expert solutions can save you on installation and operating costs, while ensuring the safety of all pipes and fittings. We also offer gas servicing and maintenance, available at your request.",
    icon: "flame",
  },
  {
    slug: "hot-water-systems",
    title: "Hot water systems",
    summary:
      "Repairs to all brands and models of hot water systems, done properly so you're not left cold.",
    description:
      "Don't you just hate it when you wake up in the morning only to find you have no hot water? A cold shower isn't the best way to start your day. Ware Plumbing plumbers attend regular hot water training, so we can handle every kind of repair to all brands and models of water heaters. We'll make sure your hot water is fixed properly.",
    icon: "thermometer",
  },
  {
    slug: "burst-pipe-repairs",
    title: "Burst pipe location & repairs",
    summary:
      "Rapid location and repair of burst and concealed pipes to prevent costly water damage.",
    description:
      "Usually when a pipe bursts it happens instantly, but it can be difficult to detect. Leaks can occur in concealed pipework, which could be under your house or behind a wall. It's important to act fast to avoid disasters such as collapsed ceilings, destroyed carpet or buckled floorboards. Left unaddressed, the damage can be extremely destructive, causing long-term structural and electrical damage to your property. In these situations, immediate assistance by a professional is vital. This emergency scenario can be avoided by having one of our local Ware Plumbing technicians in Melbourne's South East inspect your water pipes to locate the issue and fix the problem.",
    icon: "wrench",
  },
  {
    slug: "roofing-repairs",
    title: "Roofing & repairs",
    summary:
      "Roof repairs, replacement, restoration and roof plumbing to keep your property watertight.",
    description:
      "The roof of your property, while mostly hidden from sight, has the potential to make or break your home. Done professionally, good roofing can bring your home to life and increase its value. Not to mention that your roof plays a crucial role in sealing your property, protecting it against water leaks and other issues. At Ware Plumbing, we provide a fully comprehensive range of roofing services tailored to your unique property. This includes roofing repair, installation, replacement, roof plumbing and roofing restoration.",
    icon: "roof",
  },
];
