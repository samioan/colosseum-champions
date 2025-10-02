<script setup lang="ts">
import type { Component } from "vue";
import { Accordion } from "@/components";

defineProps<{
  sections: {
    contentComponent: Component;
    contentProps?: Record<string, unknown>;
    condition?: boolean | number;
    headerComponent?: Component;
    headerProps?: Record<string, unknown>;
    label?: string;
  }[];
}>();
</script>

<template>
  <template v-for="(section, index) in sections" :key="index">
    <Accordion v-if="section.condition">
      <template #header>
        <div v-if="section.label" class="text-sm text-center">
          {{ section.label }}
        </div>
        <component
          v-else-if="section.headerProps"
          :is="section.headerComponent"
          v-bind="section.headerProps"
        />
      </template>

      <template #content>
        <component
          :is="section.contentComponent"
          v-bind="section.contentProps"
        />
      </template>
    </Accordion>
  </template>
</template>
