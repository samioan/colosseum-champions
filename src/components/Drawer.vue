<script setup lang="ts">
import { ref, watch, onUnmounted, computed, onMounted } from "vue";

defineProps<{ title: string }>();
const open = defineModel<boolean>();

// --- Responsiveness
const isMobile = ref(true);
function checkScreen() {
  isMobile.value = window.matchMedia("(max-width: 768px)").matches;
}
onMounted(() => {
  checkScreen();
  window.addEventListener("resize", checkScreen);
});
onUnmounted(() => {
  window.removeEventListener("resize", checkScreen);
});

// --- Drag state (only for mobile)
const startY = ref(0);
const currentY = ref(0);
const offsetY = ref(0);
const isDragging = ref(false);
const lastTime = ref(0);
const velocity = ref(0);
const isSnapAnimating = ref(false);
const closing = ref(false);

const THRESHOLD = 100;
const FLICK_SPEED = 800;

function addGlobalListeners() {
  window.addEventListener("mousemove", onMove);
  window.addEventListener("mouseup", onEnd);
  window.addEventListener("touchmove", onMove, { passive: false });
  window.addEventListener("touchend", onEnd);
}
function removeGlobalListeners() {
  window.removeEventListener("mousemove", onMove);
  window.removeEventListener("mouseup", onEnd);
  window.removeEventListener("touchmove", onMove as any);
  window.removeEventListener("touchend", onEnd);
}

const onStart = (e: TouchEvent | MouseEvent) => {
  if (!isMobile.value) return; // disable drag on desktop
  isDragging.value = true;
  isSnapAnimating.value = false;
  closing.value = false;

  startY.value =
    "touches" in e ? e.touches[0].clientY : (e as MouseEvent).clientY;
  currentY.value = startY.value;
  lastTime.value = performance.now();
  velocity.value = 0;
  addGlobalListeners();
};

const onMove = (e: TouchEvent | MouseEvent) => {
  if (!isDragging.value) return;
  if ("touches" in e) {
    if (e.touches.length > 1) return;
    e.preventDefault();
  }

  const y = "touches" in e ? e.touches[0].clientY : (e as MouseEvent).clientY;
  const now = performance.now();
  const dy = y - currentY.value;
  const dt = now - lastTime.value || 1;
  velocity.value = (dy / dt) * 1000;
  currentY.value = y;
  lastTime.value = now;
  offsetY.value = Math.max(0, currentY.value - startY.value);
};

const onEnd = () => {
  if (!isDragging.value) return;
  isDragging.value = false;
  removeGlobalListeners();

  const shouldClose = offsetY.value > THRESHOLD || velocity.value > FLICK_SPEED;
  if (shouldClose) {
    closing.value = true;
    setTimeout(() => {
      closing.value = false;
      open.value = false;
    }, 100);
  } else {
    isSnapAnimating.value = true;
    offsetY.value = 0;
  }
};

const onTransformEnd = (e: TransitionEvent) => {
  if (e.propertyName !== "transform") return;
  if (isSnapAnimating.value) isSnapAnimating.value = false;
};
const onFlickTransitionEnd = (e: TransitionEvent) => {
  if (!closing.value) return;
  if (e.propertyName !== "transform") return;
  closing.value = false;
  offsetY.value = 0;
  open.value = false;
};
const onAfterLeave = () => {
  offsetY.value = 0;
  isSnapAnimating.value = false;
};

watch(open, (val) => {
  document.body.style.overflow = val && isMobile.value ? "hidden" : "";
});
onUnmounted(() => {
  document.body.style.overflow = "";
  removeGlobalListeners();
});
</script>

<template>
  <transition name="fade">
    <div
      v-if="open"
      class="fixed inset-0 bg-black/70 z-40 transition-opacity"
      @click="open = false"
    />
  </transition>

  <transition name="slide-up" @after-leave="onAfterLeave">
    <div
      v-if="(open || closing) && isMobile"
      class="fixed left-0 bottom-0 w-full rounded-t-xl bg-cBgDarker z-50 flex flex-col max-h-[90vh] will-change-transform"
      :class="{
        'no-transition': isDragging,
        'snap-transition': isSnapAnimating,
        'flick-leave': closing,
      }"
      :style="{ '--drag-y': `${offsetY}px` }"
      @transitionend="
        onTransformEnd;
        onFlickTransitionEnd;
      "
    >
      <div
        class="select-none"
        @touchstart.passive="onStart"
        @mousedown="onStart"
      >
        <div class="w-full flex justify-center pt-2">
          <div class="w-12 h-1.5 bg-cBgLight rounded-full"></div>
        </div>
        <div
          class="p-4 flex justify-between items-center border-b border-cBgLight"
        >
          <span class="text-lg text-center w-full">{{ title }}</span>
        </div>
        <slot name="header" />
      </div>

      <div class="overflow-y-auto scrollbar-hidden p-4">
        <slot name="content" />
      </div>
    </div>
  </transition>

  <transition name="slide-left">
    <div
      v-if="open && !isMobile"
      class="fixed right-4 top-4 h-[calc(100%-32px)] w-[400px] bg-cBgDarker shadow-lg z-50 flex flex-col border border-cBgLight rounded-lg"
    >
      <div
        class="p-4 border-b border-cBgLight flex justify-between items-center"
      >
        <span class="text-lg">{{ title }}</span>
        <button @click="open = false">X</button>
      </div>
      <slot name="header" />
      <div class="overflow-y-auto scrollbar-hidden p-4 flex-1">
        <slot name="content" />
      </div>
    </div>
  </transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: transform 0.3s ease-in-out;
}
.slide-up-enter-from,
.slide-up-leave-to {
  --base-y: 100%;
}
.slide-up-enter-to,
.slide-up-leave-from {
  --base-y: 0%;
}
div[style*="--drag-y"] {
  transform: translateY(calc(var(--base-y, 0%) + var(--drag-y, 0px)));
}
.no-transition {
  transition: none !important;
}
.snap-transition {
  transition: transform 0.18s ease-out !important;
}
.flick-leave {
  transition: transform 0.25s ease-out !important;
  transform: translateY(calc(100% + var(--drag-y, 0px))) !important;
}

.slide-left-enter-active,
.slide-left-leave-active {
  transition: transform 0.3s ease-in-out;
}
.slide-left-enter-from,
.slide-left-leave-to {
  transform: translateX(100%);
}
.slide-left-enter-to,
.slide-left-leave-from {
  transform: translateX(0%);
}
</style>
