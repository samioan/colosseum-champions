<script setup lang="ts">
import { ref } from "vue";

const isOpen = ref(true);
const content = ref<HTMLElement | null>(null);

const toggle = () => {
  isOpen.value = !isOpen.value;
};

const onEnter = (el: Element) => {
  const element = el as HTMLElement;
  element.style.height = "0";
  element.style.overflow = "hidden";
  const height = element.scrollHeight + "px";
  window.requestAnimationFrame(() => {
    element.style.transition = "height 0.3s ease";
    element.style.height = height;
  });
};

const onAfterEnter = (el: Element) => {
  const element = el as HTMLElement;
  element.style.height = "auto";
  element.style.transition = "";
  element.style.overflow = "";
};

const onLeave = (el: Element) => {
  const element = el as HTMLElement;
  element.style.height = element.scrollHeight + "px";
  element.style.overflow = "hidden";
  window.requestAnimationFrame(() => {
    element.style.transition = "height 0.3s ease";
    element.style.height = "0";
  });
};

const onAfterLeave = (el: Element) => {
  const element = el as HTMLElement;
  element.style.transition = "";
  element.style.overflow = "";
};
</script>

<template>
  <div class="w-full">
    <div @click="toggle" class="cursor-pointer select-none">
      <slot name="header" />
    </div>

    <transition
      @enter="onEnter"
      @after-enter="onAfterEnter"
      @leave="onLeave"
      @after-leave="onAfterLeave"
    >
      <div v-show="isOpen" ref="content">
        <slot name="content" />
      </div>
    </transition>
  </div>
</template>
