<script setup lang="ts">
import { computed, watch } from "vue";
import { storeToRefs } from "pinia";
import { useGameStore } from "@/stores/game";
import { usePlayerStore } from "@/stores/player";
import {
  Drawer,
  CodexPerks,
  Items,
  CodexAbilities,
  Armory,
  Dropdown,
  StatsSection,
  Icon,
  CharacterHeader,
  MiscStatsSection,
  CharacterSection,
  PageContainer,
} from "@/components";
import { DrawerState } from "@/enums";
import { LABELS } from "@/constants";
import { gold, points, experience } from "@/assets";

const gameStore = useGameStore();
const playerStore = usePlayerStore();

const { gladiatorActivityButtons, drawer } = storeToRefs(gameStore);

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
  characterSelectedItems,
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

const abilitiesProps = computed(() => ({
  points: player.value.stats.points,
  abilities: playerAbilities.value,
}));

const perksProps = computed(() => ({
  points: player.value.stats.points,
  perks: playerPerks.value,
}));

const armoryProps = computed(() => ({
  gold: player.value.stats.gold,
  equipment: playerEquipment.value,
}));

const itemsProps = computed(() => ({
  gold: player.value.stats.gold,
  items: playerItems.value,
}));

const sections = computed(() => [
  {
    headerComponent: CharacterHeader,
    headerProps: { name: player.value.name, level: player.value.stats.level },
    contentComponent: MiscStatsSection,
    contentProps: { stats: playerMiscStats.value },
    condition: true,
  },
  {
    label: "STATS",
    contentComponent: StatsSection,
    contentProps: {
      stats: playerSecondaryStats.value,
      points: player.value.stats.points,
    },
    condition: true,
  },
  {
    label: "ABILITIES",
    contentComponent: CharacterSection,
    contentProps: { items: characterSelectedAbilities.value },
    condition: characterSelectedAbilities.value?.length,
  },
  {
    label: "PERKS",
    contentComponent: CharacterSection,
    contentProps: { items: playerSelectedPerks.value },
    condition: playerSelectedPerks.value?.length,
  },
  {
    label: "EQUIPMENT",
    contentComponent: CharacterSection,
    contentProps: { items: playerSelectedEquipment.value },
    condition: playerSelectedEquipment.value?.length,
  },
  {
    label: "ITEMS",
    contentComponent: CharacterSection,
    contentProps: { items: characterSelectedItems.value },
    condition: characterSelectedItems.value?.length,
  },
]);

watch(
  player,
  () => {
    player.value.stats.health = playerStats.value.maxHealth;
    player.value.stats.stamina = playerStats.value.maxStamina;
    player.value.stats.strength = playerStats.value.maxStrength;
    player.value.stats.defense = playerStats.value.maxDefense;
  },
  { deep: true }
);
</script>

<template>
  <PageContainer class="pb-[100px]">
    <template v-for="(section, index) in sections" :key="index">
      <Dropdown v-if="section.condition">
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
      </Dropdown>
    </template>

    <div class="fixed bottom-0 left-0 w-full">
      <div
        class="flex flex-wrap gap-4 p-4 justify-center lg:w-1/2 md:w-2/3 sm:w-3/4 w-full bg-cBgDarker mx-auto"
      >
        <Icon
          v-for="button in gladiatorActivityButtons"
          :image="button.image"
          :on-click="button.onClick"
          custom-classes="w-13 h-13"
          is-light
        />
      </div>
    </div>

    <Drawer v-model="drawer.isOpen" :title="drawer.title">
      <template #header>
        <div
          v-if="
            drawer.state === DrawerState.ARMORY ||
            drawer.state === DrawerState.ITEMS
          "
          class="w-full p-2 bg-cBgDarker flex items-center gap-2 border-b border-cBgLight"
        >
          <span>{{ LABELS.gold }}:</span>
          {{ player.stats.gold }}
        </div>
        <div
          v-else
          class="w-full p-2 bg-cBgDarker flex items-center justify-between gap-2 border-b border-cBgLight"
        >
          <span>{{ LABELS.points }}</span>
          {{ player.stats.points }}
        </div>
      </template>
      <template #content>
        <CodexAbilities
          v-if="drawer.state === DrawerState.ABILITIES"
          v-bind="abilitiesProps"
        />
        <CodexPerks
          v-if="drawer.state === DrawerState.PERKS"
          v-bind="perksProps"
        />
        <Armory
          v-if="drawer.state === DrawerState.ARMORY"
          v-bind="armoryProps"
        />
        <Items v-if="drawer.state === DrawerState.ITEMS" v-bind="itemsProps" />
      </template>
    </Drawer>
  </PageContainer>
</template>
