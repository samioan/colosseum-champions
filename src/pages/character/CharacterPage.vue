<script setup lang="ts">
import { computed, onMounted, watch } from "vue";

import { storeToRefs } from "pinia";
import { useGameStore } from "@/stores/game";
import { usePlayerStore } from "@/stores/player";
import { CharacterHeader } from "@/components";
import {
  CharacterFooter,
  CharacterSections,
  CharacterDrawer,
  MiscStats,
  CharacterSection,
  StatsSection,
} from "@/pages/character/components";
import { DrawerState } from "@/enums";
import { gold, points, experience } from "@/assets";
import { useBonusDrawer } from "@/composables";
import { LABELS, EQUIPMENT_LABELS } from "@/constants";

const gameStore = useGameStore();
const playerStore = usePlayerStore();

const {
  gladiatorActivityButtons,
  drawer,
  stages,
  pointsCollected,
  goldCollected,
} = storeToRefs(gameStore);

const {
  player,
  playerStats,
  playerSecondaryStats,
  playerAbilities,
  playerPerks,
  playerItems,
  playerEquipment,
  playerSelectedPerks,
  playerSelectedEquipment,
  characterSelectedAbilities,
  playerSelectedItems,
} = storeToRefs(playerStore);

const playerMiscStats = computed(() => [
  {
    image: experience,
    stat: player.value.stats.experience,
    maxStat: player.value.stats.maxExperience,
  },
  {
    image: points,
    stat: player.value.stats.points,
  },
  {
    image: gold,
    stat: player.value.stats.gold,
  },
]);

const bonusProps = computed(() => {
  switch (drawer.value.state) {
    case DrawerState.ABILITIES:
      return playerAbilities.value;
    case DrawerState.PERKS:
      return playerPerks.value;
    case DrawerState.ITEMS:
      return playerItems.value;
    case DrawerState.EQUIPMENT:
      return playerEquipment.value;
    case DrawerState.STAGES:
      return stages.value;
    default:
      return playerAbilities.value;
  }
});

const bonusResource = computed(() => {
  switch (drawer.value.state) {
    case DrawerState.ITEMS:
      return player.value.stats.gold;
    case DrawerState.EQUIPMENT:
      return player.value.stats.gold;
    case DrawerState.STAGES:
      return player.value.stats.gold;
    default:
      return player.value.stats.points;
  }
});

const { categoryProps, iconProps, modalProps } = useBonusDrawer(
  bonusResource,
  bonusProps,
  LABELS,
  EQUIPMENT_LABELS
);

const sections = computed(() => [
  {
    headerComponent: CharacterHeader,
    headerProps: {
      name: player.value.name,
      levelLabel: `${LABELS.LEVEL} ${player.value.stats.level}`,
    },
    contentComponent: MiscStats,
    contentProps: { stats: playerMiscStats.value },
    condition: true,
  },
  {
    label: LABELS.STATS,
    contentComponent: StatsSection,
    contentProps: {
      stats: playerSecondaryStats.value,
      points: player.value.stats.points,
    },
    condition: true,
  },
  {
    label: LABELS.ABILITIES,
    contentComponent: CharacterSection,
    contentProps: { items: characterSelectedAbilities.value },
    condition: characterSelectedAbilities.value?.length,
  },
  {
    label: LABELS.PERKS,
    contentComponent: CharacterSection,
    contentProps: { items: playerSelectedPerks.value },
    condition: playerSelectedPerks.value?.length,
  },
  {
    label: LABELS.EQUIPMENT,
    contentComponent: CharacterSection,
    contentProps: { items: playerSelectedEquipment.value },
    condition: playerSelectedEquipment.value?.length,
  },
  {
    label: LABELS.ITEMS,
    contentComponent: CharacterSection,
    contentProps: { items: playerSelectedItems.value },
    condition: playerSelectedItems.value?.length,
  },
]);

onMounted(() => {
  pointsCollected.value = 0;
  goldCollected.value = 0;
});

watch(
  player,
  () => {
    player.value.stats.health = playerStats.value.maxHealth;
    player.value.stats.stamina = playerStats.value.maxStamina;
    player.value.stats.strength = playerStats.value.maxStrength;
    player.value.stats.defense = playerStats.value.maxDefense;
  },
  { deep: true, immediate: true }
);
</script>

<template>
  <div
    class="flex flex-col mx-auto gap-4 p-4 pb-[100px] h-screen lg:w-1/2 md:w-2/3 sm:w-3/4 w-full overflow-y-auto scrollbar-hidden relative"
  >
    <CharacterSections :sections="sections" />
    <CharacterFooter :footer-buttons="gladiatorActivityButtons" />
    <CharacterDrawer
      :drawer="drawer"
      :category-props="categoryProps"
      :icon-props="iconProps"
      :modal-props="modalProps"
    />
  </div>
</template>
