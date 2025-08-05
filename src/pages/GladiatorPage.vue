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
  drawer,
} = storeToRefs(game);

const gladiatorCardProps = computed(() => ({
  headerProps: gladiatorHeaderProps.value,
  mainStats: [...gladiatorMainStats.value, ...gladiatorMainExtraStats.value],
  activityButtons: gladiatorActivityButtons.value,
  abilities: gladiatorSelectedAbilities.value,
  perks: gladiatorSelectedPerks.value,
}));

const codexProps = computed(() => ({
  statsSection: {
    title: "STATS",
    data: {
      points: gladiator.value.points,
      stats: gladiatorSecondaryStats.value,
    },
  },
  abilitiesSection: {
    title: "ABILITES",
    data: {
      points: gladiator.value.points,
      abilities: gladiatorAbilities.value,
    },
  },
  perksSection: {
    title: "PERKS",
    data: {
      points: gladiator.value.points,
      perks: gladiatorPerks.value,
    },
  },
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
      </template>
    </Drawer>
  </PageContainer>
</template>
