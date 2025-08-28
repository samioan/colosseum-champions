<script setup lang="ts">
import { storeToRefs } from "pinia";
import { ROUTES } from "@/constants";
import { useRouter } from "vue-router";
import { usePlayerStore } from "@/stores";
import { computed, watch } from "vue";
import { EquipmentSlot } from "@/enums";
import { Button, StatsSection, Icon, CharacterSection } from "@/components";
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
  <div
    class="flex flex-col bg-cBgDarker mx-auto gap-4 p-4 h-screen lg:w-1/2 md:w-2/3 sm:w-3/4 w-full overflow-y-auto scrollbar-hidden"
  >
    <div class="bg-cBgDark p-2 text-center rounded-lg">Choose Your Name</div>
    <input
      id="gladiatorName"
      type="text"
      v-model="player.name"
      placeholder="Enter your name"
      class="p-2 rounded-lg bg-cBgDark text-center border border-cBgLight"
    />

    <div class="bg-cBgDark p-2 text-center rounded-lg">Choose Your Stats</div>
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

    <div class="bg-cBgDark p-2 text-center rounded-lg">Choose Your Weapon</div>
    <div class="p-4 border border-cBgLight bg-cBgDark rounded-lg">
      <CharacterSection :items="weapons"></CharacterSection>
    </div>
    <div class="flex flex-grow items-end justify-center bg-cBgDarker">
      <Button :on-click="() => router.push(ROUTES.combat)">Fight</Button>
    </div>
  </div>
</template>
