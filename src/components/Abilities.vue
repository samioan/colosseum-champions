<script setup lang="ts">
import { ref, computed } from "vue";
import { DrawerModal, DrawerIcon } from "@/components";

type Ability = {
  label: string;
  description: string;
  image: string;
  stamina: number;
  points: number;
  isUnlocked: boolean;
  isEquipped: boolean;
  isActive: boolean;
  onSelect: () => void;
  onActivate: () => void;
};

const props = defineProps<{
  points: number;
  abilities: Ability[];
}>();

const isModalVisible = ref(false);
const selectedIndex = ref<number>(0);

const selectedAbility = computed<Ability | null>(
  () => props.abilities[selectedIndex.value] ?? null
);

const abilityStatus = computed(() => {
  const a = selectedAbility.value;
  if (!a) return "";
  if (a.isActive) return "Activated";
  if (a.isEquipped) return "Equipped";
  if (a.isUnlocked) return "Unequipped";
  return "Locked";
});

const iconProps = computed(() =>
  props.abilities.map((ability, index) => ({
    isActive: ability.isActive,
    isEquipped: ability.isEquipped && !ability.isActive,
    image: ability.image,
    overlayText: ability.isActive
      ? "ACT"
      : ability.isEquipped
      ? "EQP"
      : ability.isUnlocked
      ? "UNEQ"
      : "LCK",
    onSelect: () => {
      isModalVisible.value = true;
      selectedIndex.value = index;
    },
  }))
);

const modalProps = computed(() => {
  const a = selectedAbility.value;
  if (!a) return {};

  const hasNotEnoughPoints = !a.isUnlocked && a.points > props.points;
  const hasMaximumEquipped =
    a.isUnlocked &&
    !a.isEquipped &&
    props.abilities.filter((ab) => ab.isEquipped).length === 3;

  const equipLabel = !a.isUnlocked
    ? "Unlock"
    : !a.isEquipped
    ? "Equip"
    : "Unequip";

  const activateLabel = !a.isActive ? "Activate" : "Deactivate";

  return {
    modelValue: isModalVisible.value,
    "onUpdate:modelValue": (val: boolean | undefined) =>
      (isModalVisible.value = !!val),
    onClose: () => {
      isModalVisible.value = false;
      selectedIndex.value = 0;
    },
    label: a.label,
    image: a.image,
    description: a.description,
    stamina: a.stamina,
    points: a.points,
    status: abilityStatus.value,
    hasNotEnoughPoints,
    hasMaximumEquipped,
    onSelect: a.onSelect,
    equipLabel,
    onActivate: a.onActivate,
    activateLabel,
    isEquipped: a.isEquipped,
  };
});
</script>

<template>
  <div class="p-4">
    <div
      class="bg-cBgDark border border-cBgLight flex flex-wrap justify-center p-4 gap-4 rounded-lg"
    >
      <DrawerIcon
        v-for="(props, index) in iconProps"
        :key="index"
        v-bind="props"
      />
    </div>

    <DrawerModal v-bind="modalProps" />
  </div>
</template>
