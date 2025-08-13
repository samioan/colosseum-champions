import { defineStore } from "pinia";
import { ref, computed, type ComputedRef } from "vue";
import type { Gladiator, GladiatorStats } from "@/types";
import { createEnemy, calculatePerks, calculateEquipment } from "@/utils";
import { LABELS, COLORS } from "@/constants";
import { StatKey } from "@/enums";

export const useEnemyStore = defineStore("enemy", () => {
  const enemy = ref<Gladiator>(createEnemy());

  const enemyHeaderProps = computed(() => ({
    name: enemy.value.name,
    level: enemy.value.stats.level,
  }));

  const enemyStats: ComputedRef<GladiatorStats> = computed(() => {
    const computedPerks = calculatePerks(enemy.value, enemy.value.stats);
    const computedEquipment = calculateEquipment(enemy.value);

    const updatedStats = Object.fromEntries(
      Object.entries(enemy.value.stats).map((stat) => [
        stat[0],
        stat[1] +
          (computedPerks[stat[0] as StatKey] ?? 0) +
          (computedEquipment[stat[0] as StatKey] ?? 0),
        ,
      ])
    ) as GladiatorStats;

    const updatedPerks = calculatePerks(enemy.value, updatedStats);

    return Object.fromEntries(
      Object.entries(enemy.value.stats).map((stat) => [
        stat[0],
        stat[1] +
          (updatedPerks[stat[0] as StatKey] ?? 0) +
          (computedEquipment[stat[0] as StatKey] ?? 0),
        ,
      ])
    ) as GladiatorStats;
  });

  const enemyMainStats = computed(() => [
    {
      label: LABELS.health,
      stat: enemyStats.value.health,
      maxStat: enemyStats.value.maxHealth,
      colorClass: COLORS.health,
    },
  ]);

  return {
    enemy,
    enemyStats,
    enemyHeaderProps,
    enemyMainStats,
  };
});
