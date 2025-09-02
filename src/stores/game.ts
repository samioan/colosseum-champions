import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { ROUTES, CUTSCENES, LABELS } from "@/constants";
import { DrawerState, FightTurn, CutsceneId, Language } from "@/enums";
import type { Cutscene } from "@/types";
import { perks, items, abilities, equipment, arena } from "@/assets";

export const useGameStore = defineStore("game", () => {
  const router = useRouter();
  const fightTurn = ref<FightTurn>(FightTurn.NONE);
  const stage = ref(1);
  const currentLanguage = ref<Language>(Language.ENGLISH);
  const labels = computed(() => LABELS[currentLanguage.value]);
  const currentCutsceneId = computed<CutsceneId>(() => {
    return (
      {
        1: CutsceneId.STAGE_1,
        5: CutsceneId.STAGE_5,
        10: CutsceneId.STAGE_10,
        15: CutsceneId.STAGE_15,
        20: CutsceneId.STAGE_20,
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
        toggleDrawer(DrawerState.ABILITIES, labels.value.abilities),
      image: abilities,
    },
    {
      onClick: () => toggleDrawer(DrawerState.PERKS, labels.value.perks),
      image: perks,
    },
    {
      onClick: () =>
        toggleDrawer(DrawerState.EQUIPMENT, labels.value.equipment),
      image: equipment,
    },
    {
      onClick: () => toggleDrawer(DrawerState.ITEMS, labels.value.items),
      image: items,
    },
    {
      onClick: () =>
        router.push(
          stage.value % 5 === 0 || stage.value === 1
            ? ROUTES.cutscene
            : ROUTES.combat
        ),
      image: arena,
    },
  ]);

  return {
    gladiatorActivityButtons,
    drawer,
    toggleDrawer,
    fightTurn,
    currentCutsceneId,
    currentCutscene,
    stage,
    labels,
  };
});
