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
          class="text-sm block"
          :class="
            message.from === gladiatorId
              ? 'text-blue-300 text-left'
              : 'text-red-300 text-right'
          "
          >{{ message.text }}</span
        >
      </div>
    </div>
  </CardContainer>
</template>
