import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { CUTSCENES, LABELS, ROUTES, STAGES } from "@/constants";
import { DrawerState, FightTurn, CutsceneId, Language } from "@/enums";
import type { Cutscene } from "@/types";
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
  const currentLanguage = ref<Language>(Language.ENGLISH);
  const labels = computed(() => LABELS[currentLanguage.value]);
  const currentCutsceneId = computed<CutsceneId>(() => {
    return (
      {
        1: CutsceneId.STAGE_1,
        6: CutsceneId.STAGE_5,
        11: CutsceneId.STAGE_10,
        16: CutsceneId.STAGE_15,
        21: CutsceneId.STAGE_20,
      }[stage.value] ?? CutsceneId.STAGE_1
    );
  });
  const currentCutscene = computed<Cutscene>(
    () => CUTSCENES[currentCutsceneId.value]
  );

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
      onClick: () =>
        toggleDrawer(DrawerState.ABILITIES, labels.value.ABILITIES),
      image: piercingThrust,
    },
    {
      onClick: () => toggleDrawer(DrawerState.PERKS, labels.value.PERKS),
      image: perks,
    },
    {
      onClick: () =>
        toggleDrawer(DrawerState.EQUIPMENT, labels.value.EQUIPMENT),
      image: breastplate06,
    },
    {
      onClick: () => toggleDrawer(DrawerState.ITEMS, labels.value.ITEMS),
      image: giantHealthPotion,
    },
    {
      onClick: () => toggleDrawer(DrawerState.STAGES, labels.value.STAGES),
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
    currentCutsceneId,
    currentCutscene,
    stage,
    highestStage,
    stages,
    labels,
    pointsCollected,
    goldCollected,
  };
});
