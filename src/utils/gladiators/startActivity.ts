import type { Gladiator } from "@/types";

export default function startActivity<K extends keyof Gladiator>(
  gladiator: Gladiator,
  activityKey: K,
  activity: () => void,
  activityTime: number
) {
  (gladiator[activityKey] as boolean) = true;
  gladiator.intervalId = setInterval(() => {
    activity();
  }, activityTime);
}
