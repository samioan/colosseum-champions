<script setup lang="ts">
import { computed, onBeforeMount } from "vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { usePlayerStore, useEnemyStore, useGameStore } from "@/stores";
import { CombatCard, CardStatBar, Modal, Header } from "@/components";
import { gameBackground } from "@/assets";
import { createEnemy, handleFighting } from "@/utils";
import { ROUTES, LABELS } from "@/constants";
import { enemy1Death, enemy1Idle, enemy1Attack, enemy1Hurt } from "@/assets";
import { FightTurn } from "@/enums";

const router = useRouter();

const { fightTurn } = storeToRefs(useGameStore());

const {
  player,
  playerStats,
  playerHeaderProps,
  playerMainStats,
  playerSelectedAbilities,
  playerSelectedItems,
} = storeToRefs(usePlayerStore());

const { enemy, enemyStats, enemyMainStats } = storeToRefs(useEnemyStore());

const gladiatorCardProps = computed(() => ({
  headerProps: playerHeaderProps.value,
  mainStats: playerMainStats.value.slice(0, 2),
  abilities: playerSelectedAbilities.value,
  items: playerSelectedItems.value,
}));

onBeforeMount(() => {
  enemy.value = createEnemy(player.value.stats.level);
  enemy.value.stats.health = enemyStats.value.maxHealth;
  enemy.value.stats.stamina = enemyStats.value.maxStamina;
  enemy.value.stats.strength = enemyStats.value.maxStrength;
  enemy.value.stats.defense = enemyStats.value.maxDefense;
  player.value.intervalId = setInterval(() => {
    handleFighting(
      player.value,
      enemy.value,
      playerStats.value,
      enemyStats.value,
      fightTurn
    );
  }, 1000);
});

const combatModalProps = computed(() => ({
  isVisible: player.value.stats.health <= 0 || enemy.value?.stats.health <= 0,
  onClick: () =>
    router.push(ROUTES[player.value.stats.health <= 0 ? "home" : "gladiator"]),
}));

const enemyImage = computed(() => {
  if (enemy.value.stats.health > 0) {
    if (fightTurn.value === FightTurn.PLAYER) {
      return enemy1Attack;
    } else if (fightTurn.value === FightTurn.ENEMY) {
      return enemy1Hurt;
    } else if (fightTurn.value === FightTurn.NONE) {
      return enemy1Idle;
    }
  } else return enemy1Death;
});
</script>

<template>
  <div class="flex min-w-screen min-h-screen">
    <div class="flex flex-col justify-center mx-auto md:w-1/2 w-full z-[1]">
      <div
        class="bg-cBgDark flex flex-col w-full border-4 border-b-2 border-gray-500"
      >
        <div
          class="flex justify-between items-center gap-4 p-2 border-b-2 border-gray-500"
        >
          <h2 class="text-xs font-bold text-gray-100">
            {{ enemy.name }}
          </h2>
          <span
            class="text-xs px-2 py-1 rounded-full bg-yellow-900 text-yellow-200 font-semibold whitespace-nowrap"
          >
            {{ LABELS.level }} {{ enemy.stats.level }}
          </span>
        </div>

        <div class="flex gap-2 p-2" v-if="enemyMainStats">
          <div class="flex-1 flex flex-col gap-3">
            <CardStatBar v-for="stat in enemyMainStats" v-bind="stat" />
          </div>
        </div>
      </div>
      <Header
        class="relative w-full justify-center items-center overflow-hidden"
      >
        <img
          class="object-cover h-full"
          :src="gameBackground"
          alt="background"
        />

        <img
          class="absolute bottom-0 object-cover left-1/2 h-full float-slow"
          :src="enemyImage"
          alt="enemy"
        />
      </Header>
      <CombatCard v-bind="gladiatorCardProps" />
      <Modal v-bind="combatModalProps">
        <h2 class="text-gray-300 mb-6">Fight over!</h2>
      </Modal>
    </div>
  </div>
</template>

<style scoped>
@keyframes float-slow {
  0%,
  100% {
    transform: translate(-50%, 0);
  }
  50% {
    transform: translate(-50%, 3px);
  }
}

.float {
  animation: float 3s ease-in-out infinite;
}

.float-slow {
  animation: float-slow 4s ease-in-out infinite;
}
</style>
