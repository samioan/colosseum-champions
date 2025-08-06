<script setup lang="ts">
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useGameStore } from "@/stores/game";
import {
  GladiatorCard,
  PageContainer,
  Header,
  Drawer,
  Codex,
  ItemShop,
} from "@/components";
import { dungeonBackground } from "@/assets";
import { DrawerState } from "@/enums";

const game = useGameStore();

const {
  gladiator,
  gladiatorHeaderProps,
  gladiatorMainStats,
  gladiatorMainExtraStats,
  gladiatorSecondaryStats,
  gladiatorActivityButtons,
  gladiatorAbilities,
  gladiatorPerks,
  gladiatorSelectedAbilities,
  gladiatorSelectedPerks,
  gladiatorItems,
  gladiatorSelectedItems,
  drawer,
} = storeToRefs(game);

const gladiatorCardProps = computed(() => ({
  headerProps: gladiatorHeaderProps.value,
  mainStats: [...gladiatorMainStats.value, ...gladiatorMainExtraStats.value],
  activityButtons: gladiatorActivityButtons.value,
  abilities: gladiatorSelectedAbilities.value,
  perks: gladiatorSelectedPerks.value,
  items: gladiatorSelectedItems.value,
}));

const codexProps = computed(() => ({
  statsSection: {
    title: "STATS",
    data: {
      points: gladiator.value.stats.points,
      stats: gladiatorSecondaryStats.value,
    },
  },
  abilitiesSection: {
    title: "ABILITES",
    data: {
      points: gladiator.value.stats.points,
      abilities: gladiatorAbilities.value,
    },
  },
  perksSection: {
    title: "PERKS",
    data: {
      points: gladiator.value.stats.points,
      perks: gladiatorPerks.value,
    },
  },
}));

const itemShopProps = computed(() => ({
  gold: gladiator.value.stats.gold,
  items: gladiatorItems.value,
}));
</script>

<template>
  <PageContainer>
    <div class="flex flex-col justify-center mx-auto sm:w-1/2 w-full z-[1]">
      <Header
        ><img class="object-cover h-full" :src="dungeonBackground"
      /></Header>
      <GladiatorCard v-bind="gladiatorCardProps" />
    </div>
    <Drawer v-model="drawer.isOpen" :title="drawer.title">
      <template #content>
        <Codex
          v-if="drawer.state === DrawerState.CHARACTER"
          v-bind="codexProps"
        />
        <ItemShop
          v-else-if="drawer.state === DrawerState.ITEMS"
          v-bind="itemShopProps"
        />
      </template>
    </Drawer>
  </PageContainer>
</template>
