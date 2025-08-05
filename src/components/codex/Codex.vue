<script setup lang="ts">
import {
  Dropdown,
  CodexStats,
  CodexHeader,
  CodexAbilities,
  CodexPerks,
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
  perksSection: {
    title: string;
    data: {
      points: number;
      perks: {
        label: string;
        description: string;
        isUnlocked: boolean;
        isSelected: boolean;
        onSelect: () => void;
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
      <CodexAbilities v-bind="abilitiesSection.data" />
    </template>
  </Dropdown>
  <Dropdown>
    <template #header><CodexHeader :title="perksSection.title" /> </template>
    <template #content>
      <CodexPerks v-bind="perksSection.data" />
    </template>
  </Dropdown>
</template>
