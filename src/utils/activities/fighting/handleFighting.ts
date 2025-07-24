import type { Gladiator, Enemy } from "@/types";
import {
  findGladiator,
  handleFightingStats,
  handleFightingDefeat,
  handleFightingVictory,
} from "@/utils";
import type { Ref } from "vue";
import { computed } from "vue";

export default function handleFighting(
  gladiator: Gladiator,
  gladiators: Ref<Gladiator[]>,
  enemies: Ref<Enemy[]>
) {
  const enemy = computed(() =>
    findGladiator(enemies.value as Gladiator[], gladiator.id)
  );

  if (!enemy.value) return;

  handleFightingStats(gladiator, enemy.value);

  if (gladiator.health <= 0 || gladiator.stamina <= 0) {
    handleFightingDefeat(gladiator, gladiators, enemies);
  }

  if (enemy.value.health <= 0 || enemy.value.stamina <= 0) {
    handleFightingVictory(gladiator, enemy.value, enemies);
  }
}
