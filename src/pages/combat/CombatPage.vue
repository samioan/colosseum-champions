<script setup lang="ts">
import { computed, onBeforeMount, watch } from "vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { usePlayerStore, useEnemyStore, useGameStore } from "@/stores";
import { Modal, CharacterHeader, Button, Accordion, Icon } from "@/components";
import { StatusBar, EnemyImage } from "@/pages/combat/components";
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
  enemy1,
  enemy2,
  enemy3,
  enemy4,
  enemy5,
  enemy6,
  enemy7,
  enemy8,
  enemy9,
  enemy10,
} from "@/assets";
import { createEnemy, handleFighting } from "@/utils";
import { LABELS, ROUTES } from "@/constants";
import { DrawerState, IconSize, BonusStatus } from "@/enums";

const router = useRouter();

const {
  fightTurn,
  stage,
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
  Object.values(player.value?.abilities)
    ?.filter(
      (ability) =>
        ability.status === BonusStatus.EQUIPPED ||
        ability.status === BonusStatus.ACTIVE
    )
    .forEach((ability) => {
      ability.cooldown = 0;
    });
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

const enemies = [
  enemy1,
  enemy2,
  enemy3,
  enemy4,
  enemy5,
  enemy6,
  enemy7,
  enemy8,
  enemy9,
  enemy10,
];

const enemyImageProps = computed(() => ({
  fightTurn: fightTurn.value,
  stage: stage.value,
  playerHealth: player.value.stats.health,
  enemyHealth: enemy.value.stats.health,
  enemy: enemies[stage.value - 1],
}));

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
        :level-label="`${LABELS.LEVEL} ${enemy.stats.level}`"
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
      <EnemyImage v-bind="enemyImageProps" />
    </div>

    <Accordion>
      <template #header>
        <div class="flex flex-col gap-4">
          <CharacterHeader
            :name="player.name"
            :level-label="`${LABELS.LEVEL} ${player.stats.level}`"
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
              {{ LABELS.ABILITIES }}
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
              {{ LABELS.ITEMS }}
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
              if (stage > highestStage) {
                if (stage % 10 === 0 && enemy?.stats.health !== 0) {
                  highestStage = highestStage;
                } else highestStage = stage;
              }
              router.push(stage === 120 ? ROUTES.ending : ROUTES.character);
            }
          "
        >
          {{ LABELS.CONTINUE }}
        </Button>
      </div>
    </Modal>
  </div>
</template>
