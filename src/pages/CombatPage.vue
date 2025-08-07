<script setup lang="ts">
import { computed, onBeforeMount } from "vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { usePlayerStore, useEnemyStore } from "@/stores";
import { CombatCard, Modal, Header } from "@/components";
import { gameBackground } from "@/assets";
import { createEnemy, handleFighting } from "@/utils";
import { ROUTES } from "@/constants";

const router = useRouter();

const {
  player,
  playerHeaderProps,
  playerMainStats,
  playerSelectedAbilities,
  playerSelectedItems,
} = storeToRefs(usePlayerStore());

const { enemy, enemyHeaderProps, enemyMainStats } = storeToRefs(
  useEnemyStore()
);

const gladiatorCardProps = computed(() => ({
  headerProps: playerHeaderProps.value,
  mainStats: playerMainStats.value.slice(0, 3),
  abilities: playerSelectedAbilities.value,
  items: playerSelectedItems.value,
}));

const enemyCardProps = computed(() => ({
  headerProps: enemyHeaderProps.value,
  mainStats: enemyMainStats.value,
}));

onBeforeMount(() => {
  enemy.value = createEnemy(player.value.stats.level);
  player.value.intervalId = setInterval(() => {
    handleFighting(player.value, enemy.value);
  }, 1000);
});

const combatModalProps = computed(() => ({
  isVisible: player.value.stats.health <= 0 || enemy.value?.stats.health <= 0,
  onClick: () =>
    router.push(ROUTES[player.value.stats.health <= 0 ? "home" : "gladiator"]),
}));
</script>

<template>
  <div class="flex min-w-screen min-h-screen">
    <div class="flex flex-col justify-center mx-auto md:w-1/2 w-full z-[1]">
      <Header><img class="object-cover h-full" :src="gameBackground" /></Header>
      <CombatCard v-bind="enemyCardProps" />
      <CombatCard v-bind="gladiatorCardProps" />
      <Modal v-bind="combatModalProps">
        <h2 class="text-gray-300 mb-6">Fight over!</h2>
      </Modal>
    </div>
  </div>
</template>
