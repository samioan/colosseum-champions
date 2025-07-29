<script setup lang="ts">
import { CardContainer } from "@/components";

defineProps<{
  messages: {
    from: string;
    text: string;
  }[];
  gladiatorId: string;
}>();
</script>

<template>
  <CardContainer>
    <div class="overflow-y-auto scrollbar-hidden">
      <div v-for="message in messages">
        <span
          class="text-xs block text-center"
          :class="
            message.from === gladiatorId ? 'text-blue-300' : 'text-red-300'
          "
          >{{ message.text }}</span
        >
      </div>
    </div>
  </CardContainer>
</template>
