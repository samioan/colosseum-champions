<script setup lang="ts">
import { EQUIPMENT_LABELS } from "@/constants";
import { EquipmentSlot } from "@/enums";
import { computed, ref } from "vue";
import { DrawerIcon, DrawerModal, Accordion } from "@/components";

type Equip = {
  image: string;
  label: string;
  description: string;
  gold: number;
  slot: EquipmentSlot;
  isEquipped: boolean;
  isUnlocked: boolean;
  onBuy: () => void;
  onEquip: () => void;
};

const props = defineProps<{
  gold: number;
  equipment: Equip[];
}>();

const isModalVisible = ref(false);
const selectedIndex = ref<number>(0);
const selectedSlot = ref<EquipmentSlot>(EquipmentSlot.BOOTS);

const equipmentCategories = computed(() => {
  return props.equipment.reduce((acc, item) => {
    if (!acc[item.slot]) acc[item.slot] = [];
    acc[item.slot].push(item);
    return acc;
  }, {} as Record<EquipmentSlot, Equip[]>);
});

const selectedEquip = computed<Equip | null>(() => {
  const items = equipmentCategories.value[selectedSlot.value] ?? [];
  return items[selectedIndex.value] ?? null;
});

const equipStatus = computed(() => {
  const e = selectedEquip.value;
  if (!e) return "";
  if (e.isEquipped) return "Equipped";
  if (e.isUnlocked) return "Unequipped";
  return "Locked";
});

const categoryProps = computed(() => {
  return Object.entries(equipmentCategories.value).map(([slot, items]) => {
    return {
      slot: slot as EquipmentSlot,
      label: EQUIPMENT_LABELS[slot as EquipmentSlot],
      icons: items.map((equip, index) => ({
        image: equip.image,
        isActive: equip.isEquipped,
        isEquipped: equip.isUnlocked && !equip.isEquipped,
        overlayText: equip.isEquipped
          ? "EQP"
          : equip.isUnlocked
          ? "UNEQ"
          : "LCK",
        onSelect: () => {
          isModalVisible.value = true;
          selectedSlot.value = equip.slot;
          selectedIndex.value = index;
        },
      })),
    };
  });
});

const modalProps = computed(() => {
  const e = selectedEquip.value;
  if (!e) return {};

  const hasNotEnoughGold = props.gold < e.gold && !e.isUnlocked;
  const equipLabel = !e.isUnlocked
    ? "Unlock"
    : !e.isEquipped
    ? "Equip"
    : "Unequip";

  const onSelect = () => (e.isUnlocked ? e.onEquip() : e.onBuy());

  return {
    modelValue: isModalVisible.value,
    "onUpdate:modelValue": (val: boolean | undefined) => {
      isModalVisible.value = !!val;
    },
    onClose: () => {
      isModalVisible.value = false;
      selectedIndex.value = 0;
    },
    label: e.label,
    image: e.image,
    description: e.description,
    gold: e.gold,
    status: equipStatus.value,
    hasNotEnoughGold,
    onSelect,
    equipLabel,
  };
});
</script>

<template>
  <div class="flex flex-col justify-center p-4 gap-4">
    <Accordion v-for="category in categoryProps" :key="category.slot">
      <template #header>
        <div class="text-center">
          {{ category.label }}
        </div>
      </template>

      <template #content>
        <div class="flex flex-wrap justify-center gap-4">
          <DrawerIcon
            v-for="(props, index) in category.icons"
            :key="index"
            v-bind="props"
          />
        </div>
      </template>
    </Accordion>

    <DrawerModal v-bind="modalProps" />
  </div>
</template>
