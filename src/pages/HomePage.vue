<script setup lang="ts">
import { computed } from "vue";

import { CardButton, PageContainer } from "@/components";
import { logo } from "@/assets";
import { useRouter } from "vue-router";
import { ROUTES } from "@/constants";

const router = useRouter();

const titleButton = computed(() => ({
  onClick: () => router.push(ROUTES.recruits),
  label: "New Game",
  colorClasses: "bg-amber-600 text-white hover:bg-amber-700 w-fit",
}));
</script>

<template>
  <PageContainer custom-class="bg-[url(src/assets/titleBackground.gif)]">
    <div class="flex flex-col justify-center items-center z-[1] w-100 mx-auto">
      <img :src="logo" />
      <CardButton v-bind="titleButton" />
    </div>
  </PageContainer>
</template>
