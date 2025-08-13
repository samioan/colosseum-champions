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
  playerStats,
  playerHeaderProps,
  playerMainStats,
  playerSelectedAbilities,
  playerSelectedItems,
} = storeToRefs(usePlayerStore());

const { enemy, enemyStats, enemyHeaderProps, enemyMainStats } = storeToRefs(
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
  enemy.value.stats.health = enemyStats.value.maxHealth;
  enemy.value.stats.stamina = enemyStats.value.maxStamina;
  enemy.value.stats.strength = enemyStats.value.maxStrength;
  enemy.value.stats.defense = enemyStats.value.maxDefense;
  enemy.value.stats.dexterity = enemyStats.value.maxDexterity;
  player.value.intervalId = setInterval(() => {
    handleFighting(
      player.value,
      enemy.value,
      playerStats.value,
      enemyStats.value
    );
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
