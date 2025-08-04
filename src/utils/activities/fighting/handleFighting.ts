import type { Gladiator } from "@/types";
import {
  handleFightingCalculations,
  handleDefeat,
  handleVictory,
} from "@/utils";

export default function handleFighting(gladiator: Gladiator, enemy: Gladiator) {
  handleFightingCalculations(gladiator, enemy);

  if (gladiator.health <= 0 || gladiator.stamina <= 0) {
    handleDefeat(gladiator);
    return;
  } else if (enemy.health <= 0 || enemy.stamina <= 0) {
    handleVictory(gladiator, enemy);
    return;
  }
}
