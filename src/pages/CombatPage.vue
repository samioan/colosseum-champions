<script setup lang="ts">
import { computed, onBeforeMount, watch, ref } from "vue";
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
  enemy.value = createEnemy(stage.value);
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
    (enemy.value.stats.health <= 0 && stage.value % 5 === 1)
);

const isAttacking = ref(false);
const isHit = ref(false);
const isFading = ref(false);
const isAppearing = ref(false);

function shakeEnemyAttack() {
  isAttacking.value = true;
  setTimeout(() => (isAttacking.value = false), 500);
}

function shakeEnemyHit() {
  isHit.value = true;
  setTimeout(() => (isHit.value = false), 500);
}

function fadeEnemy() {
  isFading.value = true;
  if (stage.value % 5 !== 1) {
    setTimeout(() => (isFading.value = false), 1000);
  }
}

function appearEnemy() {
  isAppearing.value = true;
  setTimeout(() => (isAppearing.value = false), 1000);
}

const enemyImage = computed(() => {
  if (enemy.value.stats.health > 0) {
    if (fightTurn.value === FightTurn.ENEMY) {
      shakeEnemyAttack();
      return enemy1Attack;
    } else if (fightTurn.value === FightTurn.PLAYER) {
      shakeEnemyHit();
      return enemy1Hurt;
    } else if (fightTurn.value === FightTurn.NONE) {
      appearEnemy();
      return enemy1Idle;
    }
  } else {
    fadeEnemy();
    return enemy1Death;
  }
});

watch(
  enemy,
  () => {
    if (
      enemy.value.stats.health <= 0 &&
      stage.value % 5 !== 1 &&
      stage.value < 20
    ) {
      setTimeout(() => {
        enemy.value = createEnemy(stage.value);
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
        :class="{
          'shake-attack': isAttacking,
          'shake-hit': isHit,
          'fade-out': isFading,
          'fade-in': isAppearing,
        }"
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
        class="absolute left-0 top-0 p-1 text-xs z-[2] bg-cBgLight rounded-lg"
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
      class="flex items-center justify-end relative border border-cBgLight rounded-lg bg-cBgDark min-h-[68px] px-3"
    >
      <div
        class="absolute left-0 top-0 p-1 text-xs z-[2] bg-cBgLight rounded-lg"
      >
        ITEMS
      </div>

      <div class="flex gap-2 items-center overflow-x-auto scrollbar-hidden">
        <div
          v-for="item in playerSelectedItems"
          :key="item.label"
          class="flex gap-2 items-center relative shrink-0"
          @click="item.onClick"
        >
          <img
            class="w-12 h-12 object-cover p-2 rounded-lg bg-cBgLight cursor-pointer"
            :src="item.image"
          />
          <div
            class="absolute bottom-0 right-0 bg-cBgDarker text-xs px-1 rounded-tl-lg rounded-br-lg"
          >
            {{ item.amount }}
          </div>
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

<style scoped>
@keyframes shakeAttack {
  0%,
  100% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-2px);
  }
  50% {
    transform: translateX(2px);
  }
  75% {
    transform: translateX(-2px);
  }
}

@keyframes shakeHit {
  0%,
  100% {
    transform: translateY(0);
  }
  25% {
    transform: translateY(-2px);
  }
  50% {
    transform: translateY(2px);
  }
  75% {
    transform: translateY(-2px);
  }
}

@keyframes fadeOut {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.shake-attack {
  animation: shakeAttack 0.5s ease-in-out;
}

.shake-hit {
  animation: shakeHit 0.5s ease-in-out;
}

.fade-out {
  animation: fadeOut 0.75s ease-in forwards;
}

.fade-in {
  animation: fadeIn 0.75s ease-in forwards;
}
</style>
