import { ActivityState, StatAction, StatKey } from "@/enums";
import type { Gladiator } from "@/types";
import { handleStat, setActivity } from "@/utils";

export default function handleResting(gladiator: Gladiator) {
  if (
    (gladiator.stats.stamina >= gladiator.stats.maxStamina &&
      gladiator.stats.health >= gladiator.stats.maxHealth) ||
    gladiator.stats.gold < 10
  ) {
    return setActivity(gladiator, ActivityState.IDLE);
  }

  handleStat(gladiator, StatKey.GOLD, 10, StatAction.DECREASE);

  if (gladiator.stats.health < gladiator.stats.maxHealth)
    handleStat(
      gladiator,
      StatKey.HEALTH,
      Math.floor(gladiator.stats.maxHealth * 0.1),
      StatAction.INCREASE
    );
  if (gladiator.stats.stamina < gladiator.stats.maxStamina)
    handleStat(
      gladiator,
      StatKey.STAMINA,
      Math.floor(gladiator.stats.maxStamina * 0.1),
      StatAction.INCREASE
    );
}
