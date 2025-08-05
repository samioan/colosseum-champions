import { ActivityState, StatAction, StatKey } from "@/enums";
import type { Gladiator } from "@/types";
import { handleStat, setActivity } from "@/utils";

export default function handleResting(gladiator: Gladiator) {
  if (
    (gladiator.stamina >= gladiator.maxStamina &&
      gladiator.health >= gladiator.maxHealth) ||
    gladiator.gold < 10
  ) {
    return setActivity(gladiator, ActivityState.IDLE);
  }

  handleStat(gladiator, StatKey.GOLD, 10, StatAction.DECREASE);

  if (gladiator.health < gladiator.maxHealth)
    handleStat(
      gladiator,
      StatKey.HEALTH,
      Math.floor(gladiator.maxHealth * 0.1),
      StatAction.INCREASE
    );
  if (gladiator.stamina < gladiator.maxStamina)
    handleStat(
      gladiator,
      StatKey.STAMINA,
      Math.floor(gladiator.maxStamina * 0.1),
      StatAction.INCREASE
    );
}
