import type { Gladiator } from "@/types";
import { handleStat, endActivity } from "@/utils";

export default function handleResting(gladiator: Gladiator) {
  if (gladiator.health < gladiator.maxHealth)
    handleStat(
      gladiator,
      "health",
      Math.floor(gladiator.maxHealth * 0.1),
      "increment"
    );
  if (gladiator.stamina < gladiator.maxStamina)
    handleStat(
      gladiator,
      "stamina",
      Math.floor(gladiator.maxStamina * 0.1),
      "increment"
    );

  if (
    gladiator.stamina >= gladiator.maxStamina &&
    gladiator.health >= gladiator.maxHealth
  ) {
    endActivity(gladiator, "isResting");
  }
}
