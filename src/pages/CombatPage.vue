<script setup lang="ts">
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useGameStore } from "@/stores/game";
import {
  CombatBoard,
  CombatCard,
  PageContainer,
  Modal,
  Header,
  Footer,
} from "@/components";
import { gameBackground } from "@/assets";

const game = useGameStore();

const {
  gladiatorHeaderProps,
  gladiatorMainStats,
  enemyHeaderProps,
  enemyMainStats,
  combatMessages,
  combatModalProps,
  combatModalMessage,
} = storeToRefs(game);

const gladiatorCardProps = computed(() => ({
  headerProps: gladiatorHeaderProps.value,
  mainStats: gladiatorMainStats.value,
}));

const enemyCardProps = computed(() => ({
  headerProps: enemyHeaderProps.value,
  mainStats: enemyMainStats.value,
}));
</script>

<template>
  <PageContainer>
    <div class="flex flex-col justify-center mx-auto md:w-1/2 w-full z-[1]">
      <Header><img class="object-cover h-full" :src="gameBackground" /></Header>
      <CombatCard v-bind="gladiatorCardProps" />
      <CombatBoard v-bind="combatMessages" />
      <CombatCard v-bind="enemyCardProps" />
      <Modal v-bind="combatModalProps">
        <h2 class="text-gray-300 mb-6">
          {{ combatModalMessage }}
        </h2>
      </Modal>
      <Footer></Footer>
    </div>
  </PageContainer>
</template>
