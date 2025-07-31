import type { Gladiator, Enemy } from "@/types";
import {
  handleFightingCalculations,
  handleDefeat,
  handleVictory,
} from "@/utils";
import type { Ref } from "vue";
export default function handleFighting(
  gladiator: Gladiator,
  enemy: Ref<Enemy>
) {
  handleFightingCalculations(gladiator, enemy.value);

  if (gladiator.health <= 0 || gladiator.stamina <= 0) {
    handleDefeat(gladiator);
  } else if (enemy.value?.health <= 0 || enemy.value?.stamina <= 0) {
    handleVictory(gladiator, enemy.value as unknown as Enemy);
  }
}
