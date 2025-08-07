import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { LABELS, COLORS, ROUTES } from "@/constants";
import { DrawerState } from "@/enums";

export const useGameStore = defineStore("game", () => {
  const router = useRouter();

  const drawer = ref<{ isOpen: boolean; state: DrawerState; title: string }>({
    isOpen: false,
    state: DrawerState.EMPTY,
    title: "",
  });

  const gladiatorActivityButtons = computed(() => [
    {
      onClick: () => toggleDrawer(DrawerState.STATS, "Stats"),
      label: "S",
      colorClasses: COLORS.statsButton,
    },
    {
      onClick: () => toggleDrawer(DrawerState.ABILITIES, "Abilities"),
      label: "A",
      colorClasses: COLORS.statsButton,
    },
    {
      onClick: () => toggleDrawer(DrawerState.PERKS, "Perks"),
      label: "P",
      colorClasses: COLORS.statsButton,
    },
    {
      onClick: () => toggleDrawer(DrawerState.ARMORY, "Armory"),
      label: LABELS.armory,
      colorClasses: COLORS.statsButton,
    },
    {
      onClick: () => toggleDrawer(DrawerState.ITEMS, "Items"),
      label: LABELS.items,
      colorClasses: COLORS.statsButton,
    },
    {
      onClick: () => router.push(ROUTES.combat),
      label: LABELS.fight,
      colorClasses: COLORS.fightButton,
    },
  ]);

  function toggleDrawer(state: DrawerState, title: string) {
    drawer.value.isOpen = !drawer.value.isOpen;
    drawer.value.state = state;
    drawer.value.title = title;
  }

  return {
    gladiatorActivityButtons,
    drawer,
    toggleDrawer,
  };
});
