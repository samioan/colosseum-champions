import { defineStore } from "pinia";
import { ref } from "vue";

export const usePlayerStore = defineStore("player", () => {
  const fameLevel = ref<number>(0);
  const fameTitle = ref<string>("Unknown");
  const gold = ref<number>(0);

  const increaseFameLevel = (value: number) => (fameLevel.value += value);
  const increaseGold = (value: number) => (gold.value += value);
  const decreaseFameLevel = (value: number) => (fameLevel.value -= value);
  const decreaseGold = (value: number) => (gold.value -= value);

  return {
    fameLevel,
    fameTitle,
    gold,
    increaseFameLevel,
    increaseGold,
    decreaseFameLevel,
    decreaseGold,
  };
});
