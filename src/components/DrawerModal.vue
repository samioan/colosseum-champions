<script setup lang="ts">
import { Button, Modal, Icon } from "@/components";
import { energy, points as pointsIcon, gold as goldIcon } from "@/assets";
import { IconSize } from "@/enums";

const open = defineModel<boolean>();

withDefaults(
  defineProps<{
    onClose?: () => void;
    label?: string;
    image?: string;
    description?: string;
    stamina?: number;
    points?: number;
    gold?: number;
    status?: string;
    hasNotEnoughPoints?: boolean;
    hasMaximumEquipped?: boolean;
    hasNotEnoughGold?: boolean;
    onSelect?: () => void;
    equipLabel?: string;
    onActivate?: () => void;
    activateLabel?: string;
    isEquipped?: boolean;
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
    hasNotEnoughPoints: false,
    hasMaximumEquipped: false,
    hasNotEnoughGold: false,
    onSelect: () => {},
    equipLabel: "",
    onActivate: () => {},
    activateLabel: "",
    isEquipped: false,
  }
);
</script>

<template>
  <Modal v-model="open">
    <div class="flex flex-col">
      <div
        class="flex justify-between items-center mb-4 gap-4 bg-cBgDark border border-cBgLight rounded-lg p-4"
      >
        <span>
          {{ label }}
        </span>
        <span @click="onClose">X</span>
      </div>

      <div
        class="flex items-center mb-4 gap-4 bg-cBgDark border border-cBgLight rounded-lg p-4"
      >
        <Icon :image="image" :size="IconSize.LARGE" class="shrink-0" />

        <div class="flex flex-col gap-4 items-start w-fit">
          <span class="text-xs text-start">{{ description }} </span>
          <div class="flex gap-4">
            <div v-if="stamina" class="flex gap-2 items-center">
              <Icon :image="energy" />
              <span class="text-xs">{{ stamina }}</span>
            </div>
            <div v-if="points" class="flex gap-2 items-center">
              <Icon :image="pointsIcon" />
              <span class="text-xs">{{ points }}</span>
            </div>
            <div v-if="gold" class="flex gap-2 items-center">
              <Icon :image="goldIcon" />
              <span class="text-xs">{{ gold }}</span>
            </div>
          </div>
          <span class="text-xs text-cYellow">{{ status }}</span>
        </div>
      </div>

      <span
        v-if="hasNotEnoughPoints"
        class="p-4 bg-cBgDark border border-cBgLight rounded-lg text-xs mb-4 text-start text-cYellow"
      >
        Not enough points!
      </span>

      <span
        v-if="hasNotEnoughGold"
        class="p-4 bg-cBgDark border border-cBgLight rounded-lg text-xs mb-4 text-start text-cYellow"
      >
        Not enough gold!
      </span>

      <span
        v-if="hasMaximumEquipped"
        class="p-4 bg-cBgDark border border-cBgLight rounded-lg text-xs mb-4 text-start text-cYellow"
      >
        Maximum number equipped!
      </span>

      <div class="flex flex-col gap-4 items-center">
        <Button
          :on-click="onSelect"
          :disabled="
            hasNotEnoughPoints || hasMaximumEquipped || hasNotEnoughGold
          "
          >{{ equipLabel }}</Button
        >
        <Button v-if="isEquipped" :on-click="onActivate">{{
          activateLabel
        }}</Button>
      </div>
    </div>
  </Modal>
</template>
