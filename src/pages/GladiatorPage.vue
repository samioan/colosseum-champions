<script setup lang="ts">
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useGameStore } from "@/stores/game";
import { GladiatorCard, PageContainer, Footer, Header } from "@/components";
import { dungeonBackground } from "@/assets";

const game = useGameStore();

const {
  gladiator,
  gladiatorHeaderProps,
  gladiatorMainStats,
  gladiatorMainExtraStats,
  gladiatorSecondaryStats,
  gladiatorActivityButtons,
} = storeToRefs(game);

const gladiatorCardProps = computed(() => ({
  headerProps: gladiatorHeaderProps.value,
  mainStats: [...gladiatorMainStats.value, ...gladiatorMainExtraStats.value],
  secondaryStats: gladiatorSecondaryStats.value,
  activityButtons: gladiatorActivityButtons.value,
  points: gladiator.value.points,
}));
</script>

<template>
  <PageContainer>
    <div class="flex flex-col justify-center mx-auto sm:w-1/2 w-full z-[1]">
      <Header
        ><img class="object-cover h-full" :src="dungeonBackground"
      /></Header>
      <GladiatorCard v-bind="gladiatorCardProps" />
      <Footer></Footer>
    </div>
  </PageContainer>
</template>
