<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useGameStore } from "@/stores/game";
import { CutsceneId } from "@/enums";
import type { Cutscene } from "@/types";
import { CUTSCENES, ROUTES } from "@/constants";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { Button } from "@/components";

const router = useRouter();
const { currentCutsceneId } = storeToRefs(useGameStore());

function getCutsceneSteps(id: CutsceneId): {
  image: string;
  text: string;
}[] {
  const cutscene: Cutscene = CUTSCENES[id];
  if (!cutscene) return [];

  return cutscene.images.map((img, i) => ({
    image: img,
    text: cutscene.texts[i] ?? "",
  }));
}

const steps = getCutsceneSteps(currentCutsceneId.value);

let current = 0;
const cutsceneStep = ref({
  image: steps[current].image,
  text: steps[current].text,
});

function nextStep() {
  if (current < steps.length - 1) {
    current++;
    const step = steps[current];
    cutsceneStep.value = {
      image: step?.image,
      text: step?.text,
    };
  } else return;
}
</script>

<template>
  <div
    class="flex flex-col bg-cBgDarker mx-auto gap-4 p-4 h-screen lg:w-1/2 md:w-2/3 sm:w-3/4 w-full overflow-y-auto scrollbar-hidden"
    @click="nextStep"
  >
    <div class="flex flex-col w-full h-full gap-4">
      <img :src="cutsceneStep.image" class="h-1/2 object-cover" />
      <span class="text-center py-2">{{ cutsceneStep.text }}</span>

      <div class="flex flex-grow justify-center items-end">
        <Button :on-click="() => router.push(ROUTES.creation)">Begin</Button>
      </div>
    </div>
  </div>
</template>
