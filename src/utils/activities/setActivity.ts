import type { Gladiator } from "@/types";

export default function setActivity(
  gladiator: Gladiator,
  activityKey: "idle" | "training" | "fighting" | "resting",
  activity?: () => void,
  activityTime?: number
) {
  gladiator.activity = activityKey;
  if (activityKey !== "idle" && activity) {
    gladiator.intervalId = setInterval(() => {
      activity();
    }, activityTime);
  } else {
    clearInterval(gladiator.intervalId);
    gladiator.intervalId = undefined;
  }
}
