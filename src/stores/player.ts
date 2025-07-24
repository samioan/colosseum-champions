import { defineStore } from "pinia";
import { ref } from "vue";

export const usePlayerStore = defineStore("player", () => {
  const fame = ref<number>(0);
  const gold = ref<number>(0);

  return {
    fame,
    gold,
  };
});
