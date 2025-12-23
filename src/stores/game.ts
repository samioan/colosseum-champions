import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { LABELS, ROUTES, STAGES } from "@/constants";
import { DrawerState, FightTurn } from "@/enums";
import {
  perks,
  weapon05,
  breastplate06,
  giantHealthPotion,
  piercingThrust,
} from "@/assets";

export const useGameStore = defineStore("game", () => {
  const router = useRouter();
  const fightTurn = ref<FightTurn>(FightTurn.NONE);
  const stage = ref(1);
  const highestStage = ref(1);
  const pointsCollected = ref(0);
  const goldCollected = ref(0);

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
      onClick: () => toggleDrawer(DrawerState.ABILITIES, LABELS.ABILITIES),
      image: piercingThrust,
    },
    {
      onClick: () => toggleDrawer(DrawerState.PERKS, LABELS.PERKS),
      image: perks,
    },
    {
      onClick: () => toggleDrawer(DrawerState.EQUIPMENT, LABELS.EQUIPMENT),
      image: breastplate06,
    },
    {
      onClick: () => toggleDrawer(DrawerState.ITEMS, LABELS.ITEMS),
      image: giantHealthPotion,
    },
    {
      onClick: () => toggleDrawer(DrawerState.STAGES, LABELS.STAGES),
      image: weapon05,
    },
  ]);

  const stages = computed(() => {
    const allStages = STAGES.map((stageObj) => ({
      ...stageObj,
      unlocked: highestStage.value >= stageObj.level - 1,
      onSelect: () => {
        stage.value = stageObj.level;
        router.push(ROUTES.combat);
      },
    }));

    return allStages.filter((stage) => stage.unlocked);
  });

  return {
    gladiatorActivityButtons,
    drawer,
    toggleDrawer,
    fightTurn,
    stage,
    highestStage,
    stages,
    pointsCollected,
    goldCollected,
  };
});
