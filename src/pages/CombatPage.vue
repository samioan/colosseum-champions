<script setup lang="ts">
import { computed } from "vue";
import { storeToRefs } from "pinia";
import type { Gladiator } from "@/types";
import { useGameStore } from "@/stores/game";
import { STAT_LABELS, ROUTES } from "@/constants";
import { CombatBoard, CombatCard, PageContainer, Modal } from "@/components";
import { useRouter } from "vue-router";
import { removeEnemy } from "@/utils";

const router = useRouter();
const game = useGameStore();

const { gladiators, enemies } = storeToRefs(game);

const enemyCardProps = computed(() => (gladiator: Gladiator) => {
  const enemy = enemies.value.find((g) => g.gladiatorId === gladiator.id);

  return {
    headerProps: {
      name: enemy?.name ?? "",
      level: enemy?.level ?? 0,
    },
    mainStats: [
      {
        label: STAT_LABELS.HEALTH,
        stat: enemy?.health ?? 0,
        maxStat: enemy?.maxHealth ?? 0,
        colorClass: "bg-red-500",
      },
      {
        label: STAT_LABELS.STAMINA,
        stat: enemy?.stamina ?? 0,
        maxStat: enemy?.maxStamina ?? 0,
        colorClass: "bg-green-500",
      },
    ],
  };
});

const gladiatorCardProps = computed(() => (gladiator: Gladiator) => ({
  headerProps: {
    name: gladiator.name,
    level: gladiator.level,
  },
  mainStats: [
    {
      label: STAT_LABELS.HEALTH,
      stat: gladiator.health,
      maxStat: gladiator.maxHealth,
      colorClass: "bg-red-500",
    },
    {
      label: STAT_LABELS.STAMINA,
      stat: gladiator.stamina,
      maxStat: gladiator.maxStamina,
      colorClass: "bg-green-500",
    },
  ],
}));

const messages = computed(() => (gladiator: Gladiator) => {
  const msgs = [
    ...gladiator.messages,
    ...(enemies.value.find((g) => g.gladiatorId === gladiator.id)?.messages ??
      []),
  ].sort((a, b) => b.time - a.time);

  return {
    gladiatorId: gladiator.id,
    messages: msgs.slice(0, 1),
  };
});

const modalProps = computed(() => ({
  isVisible:
    gladiators.value.every((g) => g.health <= 0 || g.stamina <= 0) ||
    enemies.value.every((e) => e.health <= 0 || e.stamina <= 0),
  onClick: () => {
    enemies.value = [];
    gladiators.value.every((g) => g.health <= 0 || g.stamina <= 0) &&
      game.clearData();
    router.push(
      ROUTES[
        gladiators.value.every((g) => g.health <= 0 || g.stamina <= 0)
          ? "home"
          : "gladiator"
      ]
    );
  },
}));
</script>

<template>
  <PageContainer custom-class="bg-[url(src/assets/gameBackground.png)]">
    <div class="flex flex-col justify-center mx-auto md:w-1/2 w-full z-[1]">
      <div v-for="gladiator in gladiators" class="flex flex-col justify-center">
        <CombatCard v-bind="gladiatorCardProps(gladiator)" />
        <CombatBoard v-bind="messages(gladiator)" />
        <CombatCard v-bind="enemyCardProps(gladiator)" />
        <Modal v-bind="modalProps">
          <h2 class="text-gray-300 mb-6">
            {{ messages(gladiator).messages[0].text }}
          </h2>
        </Modal>
      </div>
    </div>
  </PageContainer>
</template>
