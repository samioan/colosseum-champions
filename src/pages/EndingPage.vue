<script setup lang="ts">
import { ROUTES } from "@/constants";
import { useRouter } from "vue-router";
import { Button } from "@/components";
import { ending } from "@/assets";

const router = useRouter();
</script>

<template>
  <div
    class="flex flex-col mx-auto gap-4 p-4 h-screen lg:w-1/2 md:w-2/3 sm:w-3/4 w-full overflow-y-auto scrollbar-hidden relative"
  >
    <div class="flex flex-col w-full h-full gap-4">
      <img :src="ending" class="h-1/2 object-cover rounded-lg" />
      <span class="text-center text-sm py-2"
        >With the Dark Lord defeated, the lands of Syleria are finally free from
        evil.<br /><br />
        You are celebrated as a great warrior and a true master of the blade.<br /><br />
        Congratulations!</span
      >

      <div class="fixed bottom-0 left-0 w-full">
        <div
          class="flex flex-wrap gap-4 p-4 justify-center w-full mx-auto bg-cBgDarker border-t border-cBgLight"
        >
          <Button
            class="lg:w-1/2 md:w-2/3 sm:w-3/4 w-full"
            :on-click="() => router.push(ROUTES.menu)"
            >Return</Button
          >
        </div>
      </div>
    </div>
  </div>
</template>
