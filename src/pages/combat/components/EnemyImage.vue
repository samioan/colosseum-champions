<script setup lang="ts">
import { computed, ref } from "vue";
import { FightTurn } from "@/enums";
import {
  hitEffect,
  deathEffect,
  enemyAttack1,
  enemyAttack2,
  enemyAttack3,
  enemyAttack4,
  enemyAttack5,
  enemyHit1,
  enemyHit2,
  enemyHit3,
  enemyHit4,
  enemyHit5,
  enemyDeath1,
  enemyDeath2,
  enemyDeath3,
  enemyDeath4,
  enemyDeath5,
} from "@/assets";

const props = defineProps<{
  fightTurn: FightTurn;
  stage: number;
  playerHealth: number;
  enemyHealth: number;
  enemy: string;
  hue: number;
}>();

const isAttacking = ref(false);
const isHit = ref(false);
const isFading = ref(false);
const isAppearing = ref(false);
const enemyHitEffects = [enemyHit1, enemyHit2, enemyHit3, enemyHit4, enemyHit5];
const enemyAttackEffects = [
  enemyAttack1,
  enemyAttack2,
  enemyAttack3,
  enemyAttack4,
  enemyAttack5,
];
const enemyDeathEffects = [
  enemyDeath1,
  enemyDeath2,
  enemyDeath3,
  enemyDeath4,
  enemyDeath5,
];

let audio = null;

function playSound(sound: string) {
  audio = new Audio(sound);
  audio.currentTime = 0;
  audio.loop = false;
  audio.volume = 0.5;
  audio.play();
}

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
  if (props.stage % 10 !== 0) {
    setTimeout(() => (isFading.value = false), 1000);
  }
}

function appearEnemy() {
  isAppearing.value = true;
  setTimeout(() => (isAppearing.value = false), 1000);
}

const enemyImage = computed(() => {
  if (props.enemyHealth > 0) {
    if (props.fightTurn === FightTurn.ENEMY) {
      shakeEnemyAttack();
      playSound(
        enemyAttackEffects[
          Math.floor(Math.random() * enemyAttackEffects.length)
        ]
      );
    } else if (props.fightTurn === FightTurn.PLAYER) {
      shakeEnemyHit();
      playSound(
        enemyHitEffects[Math.floor(Math.random() * enemyHitEffects.length)]
      );
    } else if (props.fightTurn === FightTurn.NONE) {
      if (props.playerHealth > 0) {
        appearEnemy();
      }
    }
  } else {
    playSound(
      enemyDeathEffects[Math.floor(Math.random() * enemyDeathEffects.length)]
    );
    fadeEnemy();
  }
  return props.enemy;
});

const effectImage = computed(() => {
  if (isHit.value) return hitEffect;
  if (isFading.value) return deathEffect;
  else return "";
});
</script>

<template>
  <img
    class="absolute p-2 bottom-0 object-cover left-1/2 h-full -translate-x-1/2"
    :class="{
      'shake-attack': isAttacking,
      'shake-hit': isHit,
      'fade-out': isFading,
      'fade-in': isAppearing,
    }"
    :src="enemyImage"
    :style="{ filter: `hue-rotate(${hue}deg)` }"
  />
  <img
    class="absolute bottom-0 object-cover left-1/2 h-full -translate-x-1/2"
    :src="effectImage"
  />
  <div
    class="absolute bottom-0 h-full w-full opacity-75"
    :class="{ 'attack-effect': isAttacking }"
  />
</template>

<style scoped>
.attack-effect {
  border-radius: 8px;
  box-shadow: inset 0px 0px 10px 10px crimson;
}

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
    transform: translateX(0);
  }
  25% {
    transform: translateX(-2px);
    opacity: 0.5;
  }
  50% {
    transform: translateX(2px);
  }
  75% {
    transform: translateX(-2px);
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
    transform: scale(0);
  }
  100% {
    opacity: 1;
    transform: scale(1);
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
