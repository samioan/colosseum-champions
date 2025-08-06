import type { Gladiator } from "@/types";
import {
  handleFightingCalculations,
  handleDefeat,
  handleVictory,
} from "@/utils";

export default function handleFighting(gladiator: Gladiator, enemy: Gladiator) {
  handleFightingCalculations(gladiator, enemy);

  if (gladiator.stats.health <= 0 || gladiator.stats.stamina <= 0) {
    handleDefeat(gladiator);
    return;
  } else if (enemy.stats.health <= 0 || enemy.stats.stamina <= 0) {
    handleVictory(gladiator, enemy);
    return;
  }
}
