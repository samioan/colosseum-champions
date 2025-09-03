<script setup lang="ts">
import { toRef } from "vue";
import { DrawerIcon, DrawerModal } from "@/components";
import { BonusStatus, Label } from "@/enums";
import { useBonusDrawer } from "@/composables";

type Perk = {
  image: string;
  label: string;
  description: string;
  status: BonusStatus;
  points: number;
  onSelect: () => void;
};

const props = defineProps<{
  points: number;
  perks: Perk[];
  labels: Record<Label, string>;
}>();

const { iconProps, modalProps } = useBonusDrawer(
  toRef(props, "points"),
  toRef(props, "perks"),
  props.labels
);
</script>

<template>
  <div class="flex flex-wrap justify-center gap-4">
    <DrawerIcon
      v-for="(props, index) in iconProps"
      :key="index"
      v-bind="props"
    />

    <DrawerModal v-bind="modalProps" />
  </div>
</template>
