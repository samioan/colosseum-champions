import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { LABELS, ROUTES } from "@/constants";
import { DrawerState } from "@/enums";

export const useGameStore = defineStore("game", () => {
  const router = useRouter();

  const drawer = ref<{ isOpen: boolean; state: DrawerState; title: string }>({
    isOpen: false,
    state: DrawerState.EMPTY,
    title: "",
  });

  function toggleDrawer(state: DrawerState, title: string) {
    drawer.value.isOpen = !drawer.value.isOpen;
    drawer.value.state = state;
    drawer.value.title = title;
  }

  const gladiatorActivityButtons = computed(() => [
    {
      onClick: () => toggleDrawer(DrawerState.STATS, "Stats"),
      label: "S",
      colorClasses: "bg-cBlue",
    },
    {
      onClick: () => toggleDrawer(DrawerState.ABILITIES, "Abilities"),
      label: "A",
      colorClasses: "bg-cBlue",
    },
    {
      onClick: () => toggleDrawer(DrawerState.PERKS, "Perks"),
      label: "P",
      colorClasses: "bg-cBlue",
    },
    {
      onClick: () => toggleDrawer(DrawerState.ARMORY, "Armory"),
      label: LABELS.armory,
      colorClasses: "bg-cBlue",
    },
    {
      onClick: () => toggleDrawer(DrawerState.ITEMS, "Items"),
      label: LABELS.items,
      colorClasses: "bg-cBlue",
    },
    {
      onClick: () => router.push(ROUTES.combat),
      label: LABELS.fight,
      colorClasses: "bg-cDarkRed",
    },
  ]);

  return {
    gladiatorActivityButtons,
    drawer,
    toggleDrawer,
  };
});
