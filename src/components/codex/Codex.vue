<script setup lang="ts">
import {
  Dropdown,
  CodexStats,
  CodexHeader,
  CodexAbilities,
} from "@/components";

defineProps<{
  statsSection: {
    title: string;
    data: {
      points: number;
      stats: {
        label: string;
        stat: number;
        onClick?: () => void;
      }[];
    };
  };
  abilitiesSection: {
    title: string;
    data: {
      points: number;
      abilities: {
        label: string;
        rage: number;
        description: string;
        isUnlocked: boolean;
        isSelected: boolean;
        isActive: boolean;
        onSelect: () => void;
        onActivate: () => void;
      }[];
    };
  };
}>();
</script>

<template>
  <Dropdown>
    <template #header><CodexHeader :title="statsSection.title" /> </template>
    <template #content> <CodexStats v-bind="statsSection.data" /></template>
  </Dropdown>
  <Dropdown>
    <template #header
      ><CodexHeader :title="abilitiesSection.title" />
    </template>
    <template #content>
      <CodexAbilities v-bind="abilitiesSection.data"
    /></template>
  </Dropdown>
</template>
