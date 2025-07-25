import type { Gladiator, Enemy } from "@/types";
import {
  findEnemy,
  handleFightingCalculations,
  handleDefeat,
  handleVictory,
} from "@/utils";
import type { Ref } from "vue";
import { computed } from "vue";

export default function handleFighting(
  gladiator: Gladiator,
  gladiators: Ref<Gladiator[]>,
  enemies: Ref<Enemy[]>
) {
  const enemy = computed(() => findEnemy(enemies.value, gladiator.id));

  if (!enemy.value) return;

  handleFightingCalculations(gladiator, enemy.value);

  if (gladiator.health <= 0 || gladiator.stamina <= 0) {
    handleDefeat(gladiator, gladiators, enemies);
  } else if (enemy.value?.health <= 0 || enemy.value?.stamina <= 0) {
    handleVictory(gladiator, enemy.value as unknown as Enemy, enemies);
  }
}
