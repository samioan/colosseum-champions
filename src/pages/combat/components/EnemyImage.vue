<script setup lang="ts">
import { computed, ref } from "vue";
import { FightTurn } from "@/enums";
import { enemy1Death, enemy1Idle, enemy1Attack, enemy1Hurt } from "@/assets";

const props = defineProps<{
  fightTurn: FightTurn;
  stage: number;
  playerHealth: number;
  enemyHealth: number;
}>();

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
      return enemy1Attack;
    } else if (props.fightTurn === FightTurn.PLAYER) {
      shakeEnemyHit();
      return enemy1Hurt;
    } else if (props.fightTurn === FightTurn.NONE) {
      if (props.playerHealth > 0) {
        appearEnemy();
      }
      return enemy1Idle;
    }
  } else {
    fadeEnemy();
    return enemy1Death;
  }
});
</script>

<template>
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
