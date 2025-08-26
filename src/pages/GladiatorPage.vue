<script setup lang="ts">
import { computed, watch } from "vue";
import { storeToRefs } from "pinia";
import { useGameStore } from "@/stores/game";
import { usePlayerStore } from "@/stores/player";
import {
  Button,
  Drawer,
  CodexPerks,
  Items,
  CodexAbilities,
  Armory,
  Dropdown,
  CodexPoints,
} from "@/components";
import { DrawerState } from "@/enums";
import { LABELS } from "@/constants";

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
  playerSelectedAbilities,
  playerSelectedPerks,
  playerSelectedItems,
  playerSelectedEquipment,
} = storeToRefs(playerStore);

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
  <div class="flex w-screen min-h-screen">
    <div class="flex flex-col mx-auto sm:w-1/2 w-full z-[1] min-h-screen">
      <div
        class="bg-cBgDark flex flex-col w-full pb-[100px] min-h-screen border-4 border-gray-500"
      >
        <Dropdown>
          <template #header>
            <div
              class="flex p-2 justify-between items-center gap-4 border-b-2 border-gray-500"
            >
              <span class="text-sm text-gray-100">
                {{ player.name }}
              </span>
              <span
                class="text-xs px-2 py-1 rounded-full bg-yellow-900 text-yellow-200 font-semibold whitespace-nowrap"
              >
                {{ LABELS.level }} {{ player.stats.level }}
              </span>
            </div>
          </template>
          <template #content>
            <div
              class="flex p-2 flex-wrap gap-4 border-b-2 border-gray-500 justify-between"
            >
              <div class="flex gap-2 text-xs">
                <span class="text-gray-300"> XP:</span>
                <span class="text-gray-100"
                  >{{ player.stats.experience }} /
                  {{ player.stats.maxExperience }}</span
                >
              </div>
              <div class="flex gap-2 text-xs">
                <span class="text-gray-300"> P:</span>
                <span class="text-gray-100">{{ player.stats.points }}</span>
              </div>
              <div class="flex gap-2 text-xs">
                <span class="text-gray-300"> G:</span>
                <span class="text-gray-100">{{ player.stats.gold }}</span>
              </div>
            </div>
          </template>
        </Dropdown>

        <Dropdown>
          <template #header
            ><div class="p-2 text-sm border-b-2 border-gray-500 text-center">
              STATS
            </div></template
          >
          <template #content>
            <div class="flex flex-col border-b-2 border-gray-500">
              <div v-for="statObj in playerSecondaryStats">
                <div
                  class="flex items-center justify-between p-2"
                  :class="player.stats.points ? '' : 'pointer-events-none'"
                  @click="statObj.onClick"
                >
                  <div class="flex gap-2 text-sm">
                    <span class="font-medium text-gray-300"
                      >{{ statObj.label }}:</span
                    >
                    <span class="text-gray-100">{{ statObj.stat }}</span>
                  </div>

                  <button
                    v-if="player.stats.points"
                    class="px-2 py-1 text-xs font-bold rounded-full bg-cBlue text-white disabled:opacity-50"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </template>
        </Dropdown>

        <Dropdown v-if="playerSelectedAbilities?.length">
          <template #header
            ><div class="p-2 text-sm border-b-2 border-gray-500 text-center">
              ABILITIES
            </div>
          </template>
          <template #content>
            <div
              class="flex flex-wrap justify-center gap-4 p-2 border-b-2 border-gray-500"
            >
              <div
                v-for="ability in playerSelectedAbilities"
                @click="ability.onActivate"
                class="rounded-lg bg-cBgLight flex items-center justify-center w-15 h-15"
                :class="{
                  'border-2 border-cYellow': ability.isActive,
                }"
              >
                <img
                  v-if="ability.image"
                  class="p-2 rounded-lg object-cover"
                  :src="ability.image"
                />
                <div v-else class="w-10 h-10 rounded-lg bg-cBgDark" />
              </div>
            </div>
          </template>
        </Dropdown>

        <Dropdown v-if="playerSelectedPerks?.length">
          <template #header
            ><div class="p-2 text-sm border-b-2 border-gray-500 text-center">
              PERKS
            </div></template
          >
          <template #content>
            <div
              class="flex flex-wrap justify-center gap-4 p-2 border-b-2 border-gray-500"
            >
              <img
                class="p-2 justify-center rounded-lg bg-cBgLight w-15 h-15 object-cover"
                v-for="perk in playerSelectedPerks"
                :src="perk"
              />
            </div>
          </template>
        </Dropdown>

        <Dropdown v-if="playerSelectedEquipment?.length">
          <template #header>
            <div class="p-2 text-sm border-b-2 border-gray-500 text-center">
              EQUIPMENT
            </div>
          </template>
          <template #content>
            <div
              class="flex flex-wrap justify-center gap-4 p-2 border-b-2 border-gray-500"
            >
              <img
                class="p-2 justify-center rounded-lg bg-cBgLight w-15 h-15 object-cover"
                v-for="item in playerSelectedEquipment"
                :src="item"
              />
            </div>
          </template>
        </Dropdown>

        <Dropdown v-if="playerSelectedItems?.length">
          <template #header
            ><div class="p-2 text-sm border-b-2 border-gray-500 text-center">
              ITEMS
            </div></template
          >
          <template #content>
            <div
              class="flex flex-wrap justify-center gap-4 p-2 border-b-2 border-gray-500"
            >
              <div
                v-for="item in playerSelectedItems"
                class="relative w-15 h-15"
              >
                <img
                  class="w-15 h-15 object-cover p-2 rounded-lg bg-cBgLight"
                  :src="item.image"
                />
                <div
                  class="absolute bottom-0 right-0 bg-cBgDarker text-white text-xs px-1 rounded-tl-lg rounded-br-lg"
                >
                  {{ item.amount }}
                </div>
              </div>
            </div>
          </template>
        </Dropdown>

        <div
          class="flex flex-wrap gap-2 p-2 justify-center fixed bottom-0 left-0 w-full bg-cBgDark border-4 border-t-2 border-gray-500"
        >
          <Button
            v-for="button in gladiatorActivityButtons"
            v-bind="button"
            class="w-fit text-xl"
          />
        </div>
      </div>
    </div>

    <Drawer v-model="drawer.isOpen" :title="drawer.title">
      <template #header>
        <div
          v-if="
            drawer.state === DrawerState.ARMORY ||
            drawer.state === DrawerState.ITEMS
          "
          class="w-full p-2 bg-cBgDark flex items-center gap-2 border-b-2 border-gray-500"
        >
          <span class="font-medium">{{ LABELS.gold }}:</span>
          {{ player.stats.gold }}
        </div>
        <CodexPoints v-else>{{ player.stats.points }}</CodexPoints>
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
  </div>
</template>
