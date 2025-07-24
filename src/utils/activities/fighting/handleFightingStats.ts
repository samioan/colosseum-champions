import type { Gladiator, Enemy } from "@/types";
import { handleStat } from "@/utils";

export default function handleFightingStats(
  gladiator: Gladiator,
  enemy: Enemy
) {
  handleStat(gladiator, "health", enemy.strength, "decrement");
  handleStat(gladiator, "stamina", gladiator.strength, "decrement");
  handleStat(enemy as Gladiator, "health", gladiator.strength, "decrement");
  handleStat(enemy as Gladiator, "stamina", enemy.strength, "decrement");
}
