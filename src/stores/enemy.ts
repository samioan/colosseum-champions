import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { Gladiator } from "@/types";
import { createEnemy } from "@/utils";
import { LABELS, COLORS } from "@/constants";

export const useEnemyStore = defineStore("enemy", () => {
  const enemy = ref<Gladiator>(createEnemy());

  const enemyHeaderProps = computed(() => ({
    name: enemy.value.name,
    level: enemy.value.stats.level,
  }));

  const enemyMainStats = computed(() => [
    {
      label: LABELS.health,
      stat: enemy.value.stats.health,
      maxStat: enemy.value.stats.maxHealth,
      colorClass: COLORS.health,
    },
  ]);

  return {
    enemy,
    enemyHeaderProps,
    enemyMainStats,
  };
});
