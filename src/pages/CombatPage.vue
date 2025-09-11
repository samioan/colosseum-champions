<script setup lang="ts">
import { computed, onBeforeMount, watch, ref } from "vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { usePlayerStore, useEnemyStore, useGameStore } from "@/stores";
import {
  StatusBar,
  Modal,
  CharacterHeader,
  Button,
  Accordion,
  Icon,
} from "@/components";
import {
  background01,
  background02,
  background03,
  background04,
  background05,
  background06,
  background07,
  background08,
  background09,
  background10,
  background11,
  background12,
  points,
  gold,
} from "@/assets";
import { createEnemy, handleFighting } from "@/utils";
import { ROUTES } from "@/constants";
import { enemy1Death, enemy1Idle, enemy1Attack, enemy1Hurt } from "@/assets";
import { DrawerState, FightTurn, IconSize } from "@/enums";

const router = useRouter();

const {
  fightTurn,
  stage,
  labels,
  highestStage,
  drawer,
  pointsCollected,
  goldCollected,
} = storeToRefs(useGameStore());

const {
  player,
  playerStats,
  playerMainStats,
  playerSelectedAbilities,
  playerSelectedItems,
} = storeToRefs(usePlayerStore());

const { enemy, enemyStats, enemyMainStats } = storeToRefs(useEnemyStore());

onBeforeMount(() => {
  if (drawer.value.isOpen) {
    useGameStore().toggleDrawer(DrawerState.EMPTY, "");
  }
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
        stage,
        pointsCollected,
        goldCollected
      );
    }, 1000);
  }, 400);
});

const isModalVisible = computed(
  () =>
    player.value.stats.health <= 0 ||
    (enemy.value.stats.health <= 0 && stage.value % 10 === 0)
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
  if (stage.value % 10 !== 0) {
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
      if (player.value.stats.health > 0) {
        appearEnemy();
      }
      return enemy1Idle;
    }
  } else {
    fadeEnemy();
    return enemy1Death;
  }
});

const backgrounds = [
  background01,
  background02,
  background03,
  background04,
  background05,
  background06,
  background07,
  background08,
  background09,
  background10,
  background11,
  background12,
];

function getBackgroundForStage() {
  const index = Math.min(
    Math.ceil(stage.value / 10) - 1,
    backgrounds.length - 1
  );
  return backgrounds[index];
}

watch(
  enemy,
  () => {
    if (
      enemy.value.stats.health <= 0 &&
      stage.value % 10 !== 0 &&
      stage.value < 120
    ) {
      setTimeout(() => {
        stage.value++;
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
            stage,
            pointsCollected,
            goldCollected
          );
        }, 1000);
      }, 1000);
    }
  },
  { deep: true }
);

watch(
  player,
  () => {
    if (player.value.stats.health > playerStats.value.maxHealth)
      player.value.stats.health = playerStats.value.maxHealth;
    if (player.value.stats.stamina > playerStats.value.maxStamina)
      player.value.stats.stamina = playerStats.value.maxStamina;
    if (player.value.stats.strength > playerStats.value.maxStrength)
      player.value.stats.strength = playerStats.value.maxStrength;
    if (player.value.stats.defense > playerStats.value.maxDefense)
      player.value.stats.defense = playerStats.value.maxDefense;
  },
  { deep: true, immediate: true }
);
</script>

<template>
  <div
    class="flex flex-col mx-auto gap-4 p-4 h-screen lg:w-1/2 md:w-2/3 sm:w-3/4 w-full overflow-y-auto scrollbar-hidden relative"
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
      <div class="flex-1 h-full relative overflow-hidden rounded-lg">
        <img
          class="absolute inset-0 w-full h-full object-cover"
          :src="getBackgroundForStage()"
        />
      </div>
      <img
        class="absolute bottom-0 object-cover left-1/2 h-full -translate-x-1/2"
        :class="{
          'shake-attack': isAttacking,
          'shake-hit': isHit,
          'fade-out': isFading,
          'fade-in': isAppearing,
        }"
        :src="enemyImage"
      />
    </div>

    <Accordion>
      <template #header>
        <div class="flex flex-col gap-4">
          <CharacterHeader
            :name="player.name"
            :level-label="`${labels.LEVEL} ${player.stats.level}`"
          />
          <div class="flex gap-4">
            <StatusBar v-for="stat in playerMainStats" v-bind="stat" />
          </div>
        </div>
      </template>
      <template #content>
        <div class="flex flex-col gap-4">
          <div
            class="flex flex-wrap gap-4 px-3 justify-end items-center min-h-[68px] relative border border-cBgLight rounded-lg bg-cBgDarker"
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
            class="flex items-center justify-end relative border border-cBgLight rounded-lg bg-cBgDarker min-h-[68px] px-3"
          >
            <div
              class="absolute left-0 top-0 p-1 text-xs z-[2] bg-cBgLight rounded-lg"
            >
              ITEMS
            </div>

            <div
              class="flex gap-2 items-center overflow-x-auto scrollbar-hidden"
            >
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
        </div>
      </template>
    </Accordion>

    <Modal v-model="isModalVisible">
      <div class="flex flex-col p-4 border-b border-cBgLight">
        <span>{{
          enemy?.stats.health <= 0 ? "Stage Complete!" : "You Were Defeated"
        }}</span>
      </div>
      <div
        class="flex justify-between gap-4 p-4 border-b border-cBgLight text-xs"
      >
        <div class="flex gap-4 items-center">
          <Icon :image="getBackgroundForStage()" :size="IconSize.MEDIUM" />
          <span class="font-bold">{{ stage }}</span>
        </div>
        <div class="flex gap-4 items-center">
          <Icon :image="points" :size="IconSize.MEDIUM" />
          <span class="font-bold">{{ pointsCollected }}</span>
        </div>
        <div class="flex gap-4 items-center">
          <Icon :image="gold" :size="IconSize.MEDIUM" />
          <span class="font-bold">{{ goldCollected }}</span>
        </div>
      </div>
      <div class="flex flex-col gap-4 p-4 t">
        <Button
          :on-click="
            () => {
              if (stage > highestStage) highestStage = stage;
              router.push(stage === 120 ? ROUTES.cutscene : ROUTES.character);
            }
          "
        >
          Continue
        </Button>
      </div>
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
    transform: translateY(4px);
  }
  50% {
    transform: translateY(2px);
  }
  75% {
    transform: translateY(4px);
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
