import type { Gladiator } from "@/types";
import { ActivityState } from "@/enums";

export default function setActivity(
  gladiator: Gladiator,
  activityKey: ActivityState,
  activity?: () => void,
  activityTime?: number
) {
  gladiator.activity = activityKey;
  if (activityKey !== ActivityState.IDLE && activity) {
    gladiator.intervalId = setInterval(() => {
      activity();
    }, activityTime);
  } else {
    clearInterval(gladiator.intervalId);
    gladiator.intervalId = undefined;
  }
}
