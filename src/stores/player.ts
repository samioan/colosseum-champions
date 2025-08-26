import { defineStore } from "pinia";
import { ref, computed, type ComputedRef } from "vue";
import type { Gladiator, GladiatorStats } from "@/types";
import {
  createGladiator,
  selectAbility,
  activateAbility,
  selectPerk,
  handleStat,
  useItem,
  calculateBonuses,
} from "@/utils";
import { LABELS } from "@/constants";
import { StatAction, StatKey, Label } from "@/enums";

export const usePlayerStore = defineStore("player", () => {
  const player = ref<Gladiator>(createGladiator());

  const playerStats: ComputedRef<GladiatorStats> = computed(() => {
    const computedPerks = calculateBonuses(
      player.value,
      player.value.stats,
      player.value.perks
    );
    const computedEquipment = calculateBonuses(
      player.value,
      player.value.stats,
      player.value.equipment
    );

    const updatedStats = Object.fromEntries(
      Object.entries(player.value.stats).map((stat) => [
        stat[0],
        stat[1] +
          (computedPerks[stat[0] as StatKey] ?? 0) +
          (computedEquipment[stat[0] as StatKey] ?? 0),
      ])
    ) as GladiatorStats;

    const updatedPerks = calculateBonuses(
      player.value,
      updatedStats,
      player.value.perks
    );
    const updatedEquipment = calculateBonuses(
      player.value,
      updatedStats,
      player.value.equipment
    );

    return Object.fromEntries(
      Object.entries(player.value.stats).map((stat) => [
        stat[0],
        stat[1] +
          (updatedPerks[stat[0] as StatKey] ?? 0) +
          (updatedEquipment[stat[0] as StatKey] ?? 0),
      ])
    ) as GladiatorStats;
  });

  const playerHeaderProps = computed(() => ({
    name: player.value.name,
    level: playerStats.value.level,
  }));

  const playerMainStats = computed(() =>
    [
      { stat: StatKey.HEALTH, colorClass: "bg-cRed" },
      { stat: StatKey.STAMINA, colorClass: "bg-cGreen" },
      { stat: StatKey.EXPERIENCE, colorClass: "bg-cBlue" },
      { stat: StatKey.GOLD, colorClass: "bg-cYellow" },
    ].map(({ stat, colorClass }) => ({
      label: LABELS[stat as unknown as Label],
      stat: playerStats.value[stat],
      maxStat:
        playerStats.value[
          `max${stat.charAt(0).toUpperCase()}${stat.slice(1)}` as StatKey
        ],
      colorClass: colorClass,
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
    ].map(({ stat, maxStat, value }) => ({
      label: LABELS[stat as unknown as Label],
      stat: playerStats.value[stat],
      onClick: () => {
        handleStat(
          player.value.stats,
          StatKey.POINTS,
          1,
          StatAction.DECREASE,
          playerStats.value
        );
        handleStat(
          player.value.stats,
          maxStat,
          value,
          StatAction.INCREASE,
          playerStats.value
        );
        handleStat(
          player.value.stats,
          stat,
          value,
          StatAction.INCREASE,
          playerStats.value
        );
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
      .filter((ability) => ability.isEquipped)
      .map((ability) => ({
        image: ability.image,
        label: ability.label,
        isActive: ability.isActive,
        cooldown: ability.cooldown,
        maxCooldown: ability.maxCooldown,
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
      .filter((perk) => perk.isEquipped)
      .map((perk) => perk.image)
  );

  const playerItems = computed(() => {
    return Object.values(player.value.items).map((item) => ({
      ...item,
      onBuy: () => {
        if (player.value.stats.gold >= item.gold) {
          handleStat(
            player.value.stats,
            StatKey.GOLD,
            item.gold,
            StatAction.DECREASE,
            playerStats.value
          );
          item.amount += 1;
        }
      },
    }));
  });

  const playerSelectedItems = computed(() => {
    return Object.values(player.value.items)
      .filter((item) => item.amount)
      .map((item) => ({
        ...item,
        onUse: () => useItem(item, player.value.stats, playerStats.value),
      }));
  });

  const playerEquipment = computed(() => {
    return Object.values(player.value.equipment).map((item) => ({
      ...item,
      onBuy: () => {
        if (player.value.stats.gold >= item.gold) {
          handleStat(
            player.value.stats,
            StatKey.GOLD,
            item.gold,
            StatAction.DECREASE,
            playerStats.value
          );
          item.isUnlocked = true;
        }
      },
      onEquip: () => {
        if (item.isEquipped) item.isEquipped = false;
        else {
          Object.values(player.value.equipment)
            .filter((curItem) => curItem.slot === item.slot)
            .forEach((curItem) => {
              curItem.isEquipped = false;
            });
          item.isEquipped = !item.isEquipped;
        }
      },
    }));
  });

  const playerSelectedEquipment = computed(() => {
    return Object.values(player.value.equipment)
      .filter((equipment) => equipment.isEquipped)
      .map(({ image }) => image);
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
    playerEquipment,
    playerSelectedEquipment,
  };
});
