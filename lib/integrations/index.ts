import { DEMO_MODE } from "@/lib/demo";

import { demoSms } from "@/lib/integrations/demo/sms";
import { demoJob } from "@/lib/integrations/demo/job";
import { demoStore } from "@/lib/integrations/demo/store";

import { realSms } from "@/lib/integrations/real/sms";
import { realJob } from "@/lib/integrations/real/job";
import { realStore } from "@/lib/integrations/real/store";

/**
 * The single switch: DEMO_MODE (default true) selects mock vs real for every
 * adapter. Flip NEXT_PUBLIC_DEMO_MODE="false" and wire the real impls one at a
 * time to go live. The funnel only ever imports these — never a concrete impl.
 */
export const smsProvider = DEMO_MODE ? demoSms : realSms;
export const jobProvider = DEMO_MODE ? demoJob : realJob;
export const store = DEMO_MODE ? demoStore : realStore;
