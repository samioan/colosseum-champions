import type { Gladiator } from "@/types";
import { handleStat, setActivity } from "@/utils";

export default function handleResting(gladiator: Gladiator) {
  if (
    (gladiator.stamina >= gladiator.maxStamina &&
      gladiator.health >= gladiator.maxHealth) ||
    gladiator.gold < 10
  ) {
    return setActivity(gladiator, "idle");
  }

  handleStat(gladiator, "gold", 10, "decrease");

  if (gladiator.health < gladiator.maxHealth)
    handleStat(
      gladiator,
      "health",
      Math.floor(gladiator.maxHealth * 0.1),
      "increase"
    );
  if (gladiator.stamina < gladiator.maxStamina)
    handleStat(
      gladiator,
      "stamina",
      Math.floor(gladiator.maxStamina * 0.1),
      "increase"
    );
}
