<script setup lang="ts">
import { toRef } from "vue";
import { DrawerModal, DrawerIcon } from "@/components";
import { BonusStatus, Label } from "@/enums";
import { useBonusDrawer } from "@/composables";

type Ability = {
  label: string;
  description: string;
  image: string;
  stamina: number;
  points: number;
  status: BonusStatus;
  onSelect: () => void;
  onActivate: () => void;
};

const props = defineProps<{
  points: number;
  abilities: Ability[];
  labels: Record<Label, string>;
}>();

const { iconProps, modalProps } = useBonusDrawer(
  toRef(props, "points"),
  toRef(props, "abilities"),
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
  </div>

  <DrawerModal v-bind="modalProps" />
</template>
