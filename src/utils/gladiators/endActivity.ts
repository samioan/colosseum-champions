import type { Gladiator } from "@/types";

export default function endActivity<K extends keyof Gladiator>(
  gladiator: Gladiator,
  activityKey: K
) {
  (gladiator[activityKey] as boolean) = false;
  clearInterval(gladiator.intervalId);
  gladiator.intervalId = undefined;
}
