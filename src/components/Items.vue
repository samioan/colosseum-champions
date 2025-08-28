<script setup lang="ts">
import { ref, computed } from "vue";
import { DrawerIcon, DrawerModal } from "@/components";

type Item = {
  image: string;
  label: string;
  description: string;
  gold: number;
  onBuy: () => void;
  amount: number;
};

const props = defineProps<{
  gold: number;
  items: Item[];
}>();

const isModalVisible = ref(false);
const selectedIndex = ref<number>(0);

const selectedItem = computed<Item | null>(
  () => props.items[selectedIndex.value] ?? null
);

const iconProps = computed(() =>
  props.items.map((item, index) => ({
    image: item.image,
    overlayText: `${item.amount}`,
    onSelect: () => {
      isModalVisible.value = true;
      selectedIndex.value = index;
    },
  }))
);

const modalProps = computed(() => {
  const i = selectedItem.value;
  if (!i) return {};

  const hasNotEnoughGold = props.gold < i.gold;

  return {
    modelValue: isModalVisible.value,
    "onUpdate:modelValue": (val: boolean | undefined) => {
      isModalVisible.value = !!val;
    },
    onClose: () => {
      isModalVisible.value = false;
      selectedIndex.value = 0;
    },
    label: i.label,
    image: i.image,
    description: i.description,
    gold: i.gold,
    status: `Available: ${i.amount}`,
    hasNotEnoughGold,
    onSelect: i.onBuy,
    equipLabel: "Buy",
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
