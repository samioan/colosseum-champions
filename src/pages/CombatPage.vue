<script setup lang="ts">
import { computed, onBeforeMount, watch } from "vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { usePlayerStore, useEnemyStore, useGameStore } from "@/stores";
import { StatusBar, Modal, CharacterHeader, Button } from "@/components";
import { gameBackground } from "@/assets";
import { createEnemy, handleFighting } from "@/utils";
import { ROUTES } from "@/constants";
import { enemy1Death, enemy1Idle, enemy1Attack, enemy1Hurt } from "@/assets";
import { FightTurn } from "@/enums";

const router = useRouter();

const { fightTurn, stage, labels } = storeToRefs(useGameStore());

const {
  player,
  playerStats,
  playerMainStats,
  playerSelectedAbilities,
  playerSelectedItems,
} = storeToRefs(usePlayerStore());

const { enemy, enemyStats, enemyMainStats } = storeToRefs(useEnemyStore());

onBeforeMount(() => {
  enemy.value = createEnemy(player.value.stats.level);
  enemy.value.stats.health = enemyStats.value.maxHealth;
  enemy.value.stats.stamina = enemyStats.value.maxStamina;
  enemy.value.stats.strength = enemyStats.value.maxStrength;
  enemy.value.stats.defense = enemyStats.value.maxDefense;
  setTimeout(() => {
    player.value.intervalId = setInterval(() => {
      handleFighting(
        player.value,
        enemy.value,
        playerStats.value,
        enemyStats.value,
        fightTurn,
        stage
      );
    }, 1000);
  }, 400);
});

const isModalVisible = computed(
  () =>
    player.value.stats.health <= 0 ||
    (enemy.value.stats.health <= 0 && stage.value % 5 === 0)
);

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

watch(
  enemy,
  () => {
    if (
      enemy.value.stats.health <= 0 &&
      stage.value % 5 !== 0 &&
      stage.value < 20
    ) {
      setTimeout(() => {
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
            fightTurn,
            stage
          );
        }, 1000);
      }, 1000);
    }
  },
  { deep: true }
);
</script>

<template>
  <div
    class="flex flex-col bg-cBgDarker mx-auto gap-4 p-4 h-screen lg:w-1/2 md:w-2/3 sm:w-3/4 w-full overflow-y-auto scrollbar-hidden"
  >
    <div
      class="flex flex-col gap-4 border border-cBgLight bg-cBgDark p-4 rounded-lg"
    >
      <CharacterHeader
        :name="enemy.name"
        :level-label="`${labels.LEVEL} ${enemy.stats.level}`"
      />
      <StatusBar v-bind="enemyMainStats[0]" />
    </div>

    <div class="flex-1 relative">
      <img
        class="object-cover h-full rounded-lg"
        :src="gameBackground"
        alt="background"
      />
      <img
        class="absolute bottom-0 object-cover left-1/2 h-full -translate-x-1/2"
        :src="enemyImage"
        alt="enemy"
      />
    </div>

    <div
      class="flex flex-col gap-4 border border-cBgLight bg-cBgDark p-4 rounded-lg"
    >
      <CharacterHeader
        :name="player.name"
        :level-label="`${labels.LEVEL} ${player.stats.level}`"
      />
      <div class="flex gap-4">
        <StatusBar v-for="stat in playerMainStats" v-bind="stat" />
      </div>
    </div>

    <div
      class="flex flex-wrap gap-4 px-3 justify-end items-center min-h-[68px] relative border border-cBgLight rounded-lg bg-cBgDark"
    >
      <div
        class="absolute left-0 top-0 p-1 text-xs z-[20] bg-cBgLight rounded-lg"
      >
        ABILITIES
      </div>
      <div
        class="relative box-border flex flex-col gap-2 p-2 items-center justify-center rounded-lg text-sm bg-cBgLight cursor-pointer overflow-hidden w-12 h-12 bg-cBgLight rounded-lg"
        :class="{
          'border-2 border-cYellow': ability.isActive,
        }"
        v-for="ability in playerSelectedAbilities"
        :key="ability.label"
        @click="ability.onActivate"
      >
        <div
          class="absolute bottom-0 left-0 w-full bg-cOrange transition-all duration-500 ease-out"
          :style="{
            height: `${(ability.cooldown / ability.maxCooldown) * 100}%`,
          }"
        ></div>

        <img
          v-if="ability.image"
          class="object-cover relative z-10"
          :src="ability.image"
        />
      </div>
    </div>

    <div
      class="flex flex-wrap gap-4 px-3 justify-end items-center min-h-[68px] relative border border-cBgLight rounded-lg bg-cBgDark"
    >
      <div
        class="absolute left-0 top-0 p-1 text-xs z-[20] bg-cBgLight rounded-lg"
      >
        ITEMS
      </div>
      <div
        v-for="item in playerSelectedItems"
        class="flex gap-2 items-center relative"
      >
        <img
          class="w-12 h-12 object-cover p-2 rounded-lg bg-cBgLight"
          :src="item.image"
          @click="item.onUse"
        />
        <div
          class="absolute bottom-0 right-0 bg-cBgDarker text-xs px-1 rounded-tl-lg rounded-br-lg"
        >
          {{ item.amount }}
        </div>
      </div>
    </div>

    <Modal v-model="isModalVisible">
      <div class="flex flex-col mb-2">
        <img :src="gameBackground" />
        <span class="p-2">{{
          enemy?.stats.health <= 0 ? "Victory!" : "Defeat!"
        }}</span>
      </div>
      <Button
        :on-click="
          () => router.push(stage === 20 ? ROUTES.cutscene : ROUTES.character)
        "
      >
        Continue
      </Button>
    </Modal>
  </div>
</template>
