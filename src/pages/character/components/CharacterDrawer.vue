<script setup lang="ts">
import { DrawerState, EquipmentSlot } from "@/enums";
import { DrawerIcon, DrawerModal } from "@/pages/character/components";
import { Drawer, Accordion } from "@/components";

defineProps<{
  drawer: {
    isOpen: boolean;
    title: string;
    state: DrawerState;
  };
  categoryProps: {
    slot: EquipmentSlot;
    label: string;
    icons: {}[];
  }[];
  iconProps: {}[];
  modalProps: {};
}>();
</script>

<template>
  <Drawer v-model="drawer.isOpen" :title="drawer.title">
    <template #content>
      <div class="flex flex-wrap justify-center gap-4">
        <DrawerIcon
          v-if="drawer.state !== DrawerState.EQUIPMENT"
          v-for="(props, index) in iconProps"
          :key="index"
          v-bind="props"
        />

        <Accordion
          v-else
          v-for="category in categoryProps"
          :key="category.slot"
          class="w-full"
        >
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
      </div>

      <DrawerModal v-bind="modalProps" />
    </template>
  </Drawer>
</template>
