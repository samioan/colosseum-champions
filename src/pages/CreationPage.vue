<script setup lang="ts">
import { storeToRefs } from "pinia";
import { ROUTES } from "@/constants";
import { useRouter } from "vue-router";
import { usePlayerStore } from "@/stores";
import { computed, watch } from "vue";
import { EquipmentSlot } from "@/enums";
import {
  CreationHeader,
  Button,
  StatsSection,
  Icon,
  PageContainer,
  CharacterSection,
} from "@/components";
import { points } from "@/assets";

const router = useRouter();
const { player, playerSecondaryStats, playerEquipment, playerStats } =
  storeToRefs(usePlayerStore());

const weapons = computed(() =>
  playerEquipment.value
    .filter((item) => item.slot === EquipmentSlot.WEAPON)
    .map((item) => ({
      image: item.image,
      onClick: item.onEquip,
      customClasses: item.isEquipped ? "border-cYellow" : "",
      isLight: true,
    }))
);

watch(
  player,
  () => {
    player.value.stats.health = playerStats.value.maxHealth;
    player.value.stats.stamina = playerStats.value.maxStamina;
    player.value.stats.strength = playerStats.value.maxStrength;
    player.value.stats.defense = playerStats.value.maxDefense;
  },
  { deep: true }
);
</script>

<template>
  <PageContainer>
    <CreationHeader>Choose Your Name</CreationHeader>
    <input
      id="gladiatorName"
      type="text"
      v-model="player.name"
      placeholder="Enter your name"
      class="p-2 rounded-lg bg-cBgDark text-center border border-cBgLight"
    />

    <CreationHeader>Choose Your Stats</CreationHeader>
    <div class="flex flex-col p-4 border border-cBgLight bg-cBgDark rounded-lg">
      <StatsSection
        :stats="playerSecondaryStats"
        :points="player.stats.points"
      />

      <div class="flex gap-2 items-center pt-2">
        <Icon :image="points" />
        <span>{{ player.stats.points }}</span>
      </div>
    </div>

    <CreationHeader>Choose Your Weapon</CreationHeader>
    <CharacterSection :items="weapons"></CharacterSection>
    <div class="flex flex-grow items-end justify-center bg-cBgDarker">
      <Button :on-click="() => router.push(ROUTES.combat)">Fight</Button>
    </div>
  </PageContainer>
</template>
