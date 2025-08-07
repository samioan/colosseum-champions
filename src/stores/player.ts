import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { ComputedRef } from "vue";
import type { Gladiator, GladiatorStats } from "@/types";
import {
  createGladiator,
  calculatePerks,
  selectAbility,
  activateAbility,
  selectPerk,
  handleStat,
  useItem,
} from "@/utils";
import { LABELS, COLORS } from "@/constants";
import { StatAction, StatKey, Label, Color } from "@/enums";

export const usePlayerStore = defineStore("player", () => {
  const player = ref<Gladiator>(createGladiator());

  const playerStats: ComputedRef<GladiatorStats> = computed(() => {
    const computedPerks = calculatePerks(player.value, player.value.stats);

    const updatedStats = Object.fromEntries(
      Object.entries(player.value.stats).map((stat) => [
        stat[0],
        stat[1] + (computedPerks[stat[0] as StatKey] ?? 0),
      ])
    ) as GladiatorStats;

    const updatedPerks = calculatePerks(player.value, updatedStats);

    return Object.fromEntries(
      Object.entries(player.value.stats).map((stat) => [
        stat[0],
        stat[1] + (updatedPerks[stat[0] as StatKey] ?? 0),
      ])
    ) as GladiatorStats;
  });

  const playerHeaderProps = computed(() => ({
    name: player.value.name,
    level: playerStats.value.level,
  }));

  const playerMainStats = computed(() =>
    [
      StatKey.HEALTH,
      StatKey.STAMINA,
      StatKey.RAGE,
      StatKey.EXPERIENCE,
      StatKey.GOLD,
    ].map((stat) => ({
      label: LABELS[stat as unknown as Label],
      stat: playerStats.value[stat],
      maxStat:
        playerStats.value[
          `max${stat.charAt(0).toUpperCase()}${stat.slice(1)}` as StatKey
        ],
      colorClass: COLORS[stat as unknown as Color],
    }))
  );

  const playerSecondaryStats = computed(() =>
    [
      {
        stat: StatKey.HEALTH,
        maxStat: StatKey.MAX_HEALTH,
        value: 10,
      },
      {
        stat: StatKey.STAMINA,
        maxStat: StatKey.MAX_STAMINA,
        value: 10,
      },
      {
        stat: StatKey.STRENGTH,
        maxStat: StatKey.MAX_STRENGTH,
        value: 1,
      },
      {
        stat: StatKey.DEFENSE,
        maxStat: StatKey.MAX_DEFENSE,
        value: 1,
      },
      {
        stat: StatKey.DEXTERITY,
        maxStat: StatKey.MAX_DEXTERITY,
        value: 1,
      },
    ].map(({ stat, maxStat, value }) => ({
      label: LABELS[stat as unknown as Label],
      stat: playerStats.value[stat],
      onClick: () => {
        handleStat(player.value, StatKey.POINTS, 1, StatAction.DECREASE);
        handleStat(player.value, maxStat, value, StatAction.INCREASE);
        handleStat(player.value, stat, value, StatAction.INCREASE);
      },
    }))
  );

  const playerAbilities = computed(() => {
    return Object.values(player.value.abilities).map((ability) => ({
      ...ability,
      onSelect: () => selectAbility(ability, player.value),
      onActivate: () => activateAbility(ability, player.value),
    }));
  });

  const playerSelectedAbilities = computed(() =>
    Object.values(player.value.abilities)
      .filter((ability) => ability.isSelected)
      .map((ability) => ({
        label: ability.label,
        isActive: ability.isActive,
        onActivate: () => activateAbility(ability, player.value),
      }))
  );

  const playerPerks = computed(() => {
    return Object.values(player.value.perks).map((perk) => ({
      ...perk,
      onSelect: () => selectPerk(perk, player.value),
    }));
  });

  const playerSelectedPerks = computed(() =>
    Object.values(player.value.perks)
      .filter((perk) => perk.isSelected)
      .map((perk) => perk.label)
  );

  const playerItems = computed(() => {
    return Object.values(player.value.items).map((item) => ({
      ...item,
      onBuy: () => {
        handleStat(player.value, StatKey.GOLD, item.gold, StatAction.DECREASE);
        item.amount += 1;
      },
    }));
  });

  const playerSelectedItems = computed(() => {
    return Object.values(player.value.items).map((item) => ({
      ...item,
      onUse: () => useItem(item, player.value),
    }));
  });

  return {
    player,
    playerHeaderProps,
    playerMainStats,
    playerSecondaryStats,
    playerAbilities,
    playerSelectedAbilities,
    playerPerks,
    playerSelectedPerks,
    playerItems,
    playerSelectedItems,
    playerStats,
    // computedPerks,
  };
});
