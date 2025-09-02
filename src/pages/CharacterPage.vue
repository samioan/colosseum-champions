<script setup lang="ts">
import { computed, onMounted, watch } from "vue";
import { storeToRefs } from "pinia";
import { useGameStore } from "@/stores/game";
import { usePlayerStore } from "@/stores/player";
import {
  Drawer,
  Perks,
  Items,
  Abilities,
  Equipment,
  Accordion,
  StatsSection,
  Icon,
  CharacterHeader,
  MiscStats,
  CharacterSection,
} from "@/components";
import { DrawerState, IconSize } from "@/enums";
import { gold, points, experience } from "@/assets";

const gameStore = useGameStore();
const playerStore = usePlayerStore();

const { gladiatorActivityButtons, drawer, labels } = storeToRefs(gameStore);

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

const equipmentProps = computed(() => ({
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
    headerProps: {
      name: player.value.name,
      levelLabel: `${labels.value.level} ${player.value.stats.level}`,
    },
    contentComponent: MiscStats,
    contentProps: { stats: playerMiscStats.value },
    condition: true,
  },
  {
    label: labels.value.stats,
    contentComponent: StatsSection,
    contentProps: {
      stats: playerSecondaryStats.value,
      points: player.value.stats.points,
    },
    condition: true,
  },
  {
    label: labels.value.abilities,
    contentComponent: CharacterSection,
    contentProps: { items: characterSelectedAbilities.value },
    condition: characterSelectedAbilities.value?.length,
  },
  {
    label: labels.value.perks,
    contentComponent: CharacterSection,
    contentProps: { items: playerSelectedPerks.value },
    condition: playerSelectedPerks.value?.length,
  },
  {
    label: labels.value.equipment,
    contentComponent: CharacterSection,
    contentProps: { items: playerSelectedEquipment.value },
    condition: playerSelectedEquipment.value?.length,
  },
  {
    label: labels.value.items,
    contentComponent: CharacterSection,
    contentProps: { items: characterSelectedItems.value },
    condition: characterSelectedItems.value?.length,
  },
]);

onMounted(() => {
  player.value.stats.health = playerStats.value.maxHealth;
  player.value.stats.stamina = playerStats.value.maxStamina;
  player.value.stats.strength = playerStats.value.maxStrength;
  player.value.stats.defense = playerStats.value.maxDefense;
});

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
  <div
    class="flex flex-col bg-cBgDarker mx-auto gap-4 p-4 pb-[100px] h-screen lg:w-1/2 md:w-2/3 sm:w-3/4 w-full overflow-y-auto scrollbar-hidden"
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
        class="flex flex-wrap gap-4 p-4 justify-center lg:w-1/2 md:w-2/3 sm:w-3/4 w-full bg-cBgDarker mx-auto"
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
        <Abilities
          v-if="drawer.state === DrawerState.ABILITIES"
          v-bind="abilitiesProps"
        />
        <Perks v-if="drawer.state === DrawerState.PERKS" v-bind="perksProps" />
        <Equipment
          v-if="drawer.state === DrawerState.EQUIPMENT"
          v-bind="equipmentProps"
        />
        <Items v-if="drawer.state === DrawerState.ITEMS" v-bind="itemsProps" />
      </template>
    </Drawer>
  </div>
</template>
