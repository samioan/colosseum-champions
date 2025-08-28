<script setup lang="ts">
import { ref, computed } from "vue";
import { DrawerIcon, DrawerModal } from "@/components";

type Perk = {
  image: string;
  label: string;
  description: string;
  isUnlocked: boolean;
  isEquipped: boolean;
  points: number;
  onSelect: () => void;
};

const props = defineProps<{
  points: number;
  perks: Perk[];
}>();

const isModalVisible = ref(false);
const selectedIndex = ref<number>(0);

const selectedPerk = computed<Perk | null>(
  () => props.perks[selectedIndex.value] ?? null
);

const perkStatus = computed(() => {
  const a = selectedPerk.value;
  if (!a) return "";
  if (a.isEquipped) return "Equipped";
  if (a.isUnlocked) return "Unequipped";
  return "Locked";
});

const iconProps = computed(() =>
  props.perks.map((perk, index) => ({
    isEquipped: perk.isEquipped,
    image: perk.image,
    overlayText: perk.isEquipped ? "EQP" : perk.isUnlocked ? "UNEQ" : "LCK",
    onSelect: () => {
      isModalVisible.value = true;
      selectedIndex.value = index;
    },
  }))
);

const modalProps = computed(() => {
  const a = selectedPerk.value;
  if (!a) return {};

  const hasNotEnoughPoints = !a.isUnlocked && a.points > props.points;
  const hasMaximumEquipped =
    a.isUnlocked &&
    !a.isEquipped &&
    props.perks.filter((p) => p.isEquipped).length === 3;

  const equipLabel = !a.isUnlocked
    ? "Unlock"
    : !a.isEquipped
    ? "Equip"
    : "Unequip";

  return {
    modelValue: isModalVisible.value,
    "onUpdate:modelValue": (val: boolean | undefined) => {
      isModalVisible.value = !!val;
    },
    onClose: () => {
      isModalVisible.value = false;
      selectedIndex.value = 0;
    },
    label: a.label,
    image: a.image,
    description: a.description,
    points: a.points,
    status: perkStatus.value,
    hasNotEnoughPoints,
    hasMaximumEquipped,
    onSelect: a.onSelect,
    equipLabel,
  };
});
</script>

<template>
  <div class="flex flex-wrap justify-center p-4 gap-4">
    <DrawerIcon
      v-for="(props, index) in iconProps"
      :key="index"
      v-bind="props"
    />

    <DrawerModal v-bind="modalProps" />
  </div>
</template>
