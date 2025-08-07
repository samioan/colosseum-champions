<script setup lang="ts">
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useGameStore } from "@/stores/game";
import { usePlayerStore } from "@/stores/player";
import {
  CardContainer,
  CardHeader,
  Button,
  Header,
  Drawer,
  CardStatBar,
  CodexPerks,
  CodexStats,
  ItemShop,
  CodexAbilities,
} from "@/components";
import { dungeonBackground } from "@/assets";
import { DrawerState } from "@/enums";

const gameStore = useGameStore();
const playerStore = usePlayerStore();

const { gladiatorActivityButtons, drawer } = storeToRefs(gameStore);

const {
  player,
  playerHeaderProps,
  playerMainStats,
  playerSecondaryStats,
  playerAbilities,
  playerPerks,
  playerItems,
} = storeToRefs(playerStore);

const codexProps = computed(() => ({
  statsSection: {
    title: "STATS",
    data: {
      points: player.value.stats.points,
      stats: playerSecondaryStats.value,
    },
  },
  abilitiesSection: {
    title: "ABILITES",
    data: {
      points: player.value.stats.points,
      abilities: playerAbilities.value,
    },
  },
  perksSection: {
    title: "PERKS",
    data: {
      points: player.value.stats.points,
      perks: playerPerks.value,
    },
  },
}));

const itemShopProps = computed(() => ({
  gold: player.value.stats.gold,
  items: playerItems.value,
}));
</script>

<template>
  <div class="flex min-w-screen min-h-screen">
    <div class="flex flex-col justify-center mx-auto sm:w-1/2 w-full z-[1]">
      <Header
        ><img class="object-cover h-full" :src="dungeonBackground"
      /></Header>
      <CardContainer>
        <CardHeader v-bind="playerHeaderProps" />

        <div class="flex gap-4">
          <div class="flex-1 flex flex-col gap-3">
            <CardStatBar v-for="stat in playerMainStats" v-bind="stat" />
          </div>
        </div>

        <div class="flex flex-wrap gap-2 mt-2 justify-center">
          <Button
            v-for="button in gladiatorActivityButtons"
            v-bind="button"
            class="w-fit text-xl"
          />
        </div>
      </CardContainer>
    </div>
    <Drawer v-model="drawer.isOpen" :title="drawer.title">
      <template #content>
        <CodexStats
          v-if="drawer.state === DrawerState.STATS"
          v-bind="codexProps.statsSection.data"
        />
        <CodexAbilities
          v-if="drawer.state === DrawerState.ABILITIES"
          v-bind="codexProps.abilitiesSection.data"
        />
        <CodexPerks
          v-if="drawer.state === DrawerState.PERKS"
          v-bind="codexProps.perksSection.data"
        />
        <ItemShop
          v-if="drawer.state === DrawerState.ITEMS"
          v-bind="itemShopProps"
        />
      </template>
    </Drawer>
  </div>
</template>
