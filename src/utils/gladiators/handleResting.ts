import type { Gladiator } from "@/types";
import { handleStat, endActivity } from "@/utils";

export default function handleResting(gladiator: Gladiator) {
  handleStat(gladiator, "restingDays", 1, "increment");
  handleStat(gladiator, "trainingDays", 0, "set");
  handleStat(gladiator, "fightingMatches", 0, "set");

  if (gladiator.health < gladiator.maxHealth)
    handleStat(gladiator, "health", 5, "increment");
  if (gladiator.stamina < gladiator.maxStamina)
    handleStat(gladiator, "stamina", 5, "increment");

  if (
    (gladiator.stamina === gladiator.maxStamina &&
      gladiator.health === gladiator.maxHealth) ||
    gladiator.restingDays >= gladiator.maxRestingDays
  ) {
    endActivity(gladiator, "isResting");
  }
}
