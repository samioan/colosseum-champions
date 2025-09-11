<script setup lang="ts">
import { computed } from "vue";
import { Button, Modal, Icon } from "@/components";
import { energy, points as pointsIcon, gold as goldIcon } from "@/assets";
import { IconSize } from "@/enums";

const open = defineModel<boolean>();

const props = withDefaults(
  defineProps<{
    onClose?: () => void;
    label?: string;
    image?: string;
    description?: string;
    stamina?: number;
    points?: number;
    gold?: number;
    status?: string;
    warningMessage?: string;
    buttons?: {
      label: string;
      onClick: () => void;
      disabled: boolean;
    }[];
  }>(),
  {
    onClose: () => {},
    label: "",
    image: "",
    description: "",
    stamina: 0,
    points: 0,
    gold: 0,
    status: "",
    warningMessage: "",
    buttons: undefined,
  }
);

const stats = computed(() =>
  [
    { key: "stamina", value: props.stamina, icon: energy },
    { key: "points", value: props.points, icon: pointsIcon },
    { key: "gold", value: props.gold, icon: goldIcon },
  ].filter((s) => s.value)
);
</script>

<template>
  <Modal v-model="open">
    <div class="flex flex-col">
      <div
        class="flex justify-between items-center gap-4 border-b border-cBgLight p-4"
      >
        <span class="text-start">
          {{ label }}
        </span>
        <span @click="onClose">X</span>
      </div>

      <div class="flex items-center gap-4 p-4">
        <Icon :image="image" :size="IconSize.LARGE" class="shrink-0" />

        <div class="flex flex-col gap-4 items-start w-fit">
          <span class="text-xs text-start">{{ description }} </span>
          <div class="flex gap-4" v-if="stats.length">
            <div
              v-for="stat in stats"
              :key="stat.key"
              class="flex gap-2 items-center"
            >
              <Icon :image="stat.icon" />
              <span class="text-xs">{{ stat.value }}</span>
            </div>
          </div>
          <span class="text-xs text-cYellow" v-if="status">{{ status }}</span>
        </div>
      </div>

      <span
        v-if="warningMessage"
        class="p-4 bg-cBgDarker border border-cRed rounded-lg text-xs mx-4 mb-4 text-start text-cRed"
        >{{ warningMessage }}</span
      >

      <div
        class="flex flex-col gap-4 items-center p-4 border-t border-cBgLight"
      >
        <Button
          v-for="button in buttons"
          :on-click="button.onClick"
          :disabled="button.disabled"
        >
          {{ button.label }}
        </Button>
      </div>
    </div>
  </Modal>
</template>
