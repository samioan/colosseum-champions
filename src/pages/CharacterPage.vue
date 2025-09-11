<script setup lang="ts">
import { computed, onMounted, watch } from "vue";

import { storeToRefs } from "pinia";
import { useGameStore } from "@/stores/game";
import { usePlayerStore } from "@/stores/player";
import {
  Drawer,
  Accordion,
  StatsSection,
  Icon,
  CharacterHeader,
  MiscStats,
  CharacterSection,
  DrawerIcon,
  DrawerModal,
} from "@/components";
import { DrawerState, IconSize } from "@/enums";
import { gold, points, experience } from "@/assets";
import { useBonusDrawer } from "@/composables";
import { EQUIPMENT_LABELS } from "@/constants";

const gameStore = useGameStore();
const playerStore = usePlayerStore();

const {
  gladiatorActivityButtons,
  drawer,
  labels,
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
  labels.value,
  EQUIPMENT_LABELS
);

const sections = computed(() => [
  {
    headerComponent: CharacterHeader,
    headerProps: {
      name: player.value.name,
      levelLabel: `${labels.value.LEVEL} ${player.value.stats.level}`,
    },
    contentComponent: MiscStats,
    contentProps: { stats: playerMiscStats.value },
    condition: true,
  },
  {
    label: labels.value.STATS,
    contentComponent: StatsSection,
    contentProps: {
      stats: playerSecondaryStats.value,
      points: player.value.stats.points,
    },
    condition: true,
  },
  {
    label: labels.value.ABILITIES,
    contentComponent: CharacterSection,
    contentProps: { items: characterSelectedAbilities.value },
    condition: characterSelectedAbilities.value?.length,
  },
  {
    label: labels.value.PERKS,
    contentComponent: CharacterSection,
    contentProps: { items: playerSelectedPerks.value },
    condition: playerSelectedPerks.value?.length,
  },
  {
    label: labels.value.EQUIPMENT,
    contentComponent: CharacterSection,
    contentProps: { items: playerSelectedEquipment.value },
    condition: playerSelectedEquipment.value?.length,
  },
  {
    label: labels.value.ITEMS,
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
    <template v-for="(section, index) in sections" :key="index">
      <Accordion v-if="section.condition">
        <template #header>
          <div v-if="section.label" class="text-sm text-center">
            {{ section.label }}
          </div>
          <component
            v-else-if="section.headerProps"
            :is="section.headerComponent"
            v-bind="section.headerProps"
          />
        </template>

        <template #content>
          <component
            :is="section.contentComponent"
            v-bind="section.contentProps"
          />
        </template>
      </Accordion>
    </template>

    <div class="fixed bottom-0 left-0 w-full">
      <div
        class="flex flex-wrap gap-4 p-4 justify-center w-full mx-auto bg-cBgDarker border-t border-cBgLight"
      >
        <Icon
          v-for="button in gladiatorActivityButtons"
          :image="button.image"
          :on-click="button.onClick"
          :size="IconSize.MEDIUM"
          is-light
        />
      </div>
    </div>

    <Drawer v-model="drawer.isOpen" :title="drawer.title">
      <template #content>
        <div class="flex flex-wrap justify-center gap-4">
          <DrawerIcon
            v-if="drawer.state !== DrawerState.EQUIPMENT"
            v-for="(props, index) in iconProps"
            :key="index"
            v-bind="props"
          />

          <Accordion
            v-else
            v-for="category in categoryProps"
            :key="category.slot"
            class="w-full"
          >
            <template #header>
              <div class="text-center">
                {{ category.label }}
              </div>
            </template>

            <template #content>
              <div class="flex flex-wrap justify-center gap-4">
                <DrawerIcon
                  v-for="(props, index) in category.icons"
                  :key="index"
                  v-bind="props"
                />
              </div>
            </template>
          </Accordion>
        </div>

        <DrawerModal v-bind="modalProps" />
      </template>
    </Drawer>
  </div>
</template>
