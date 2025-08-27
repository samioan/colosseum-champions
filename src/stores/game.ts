import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { LABELS, ROUTES, CUTSCENES } from "@/constants";
import { DrawerState, FightTurn, CutsceneId } from "@/enums";
import type { Cutscene } from "@/types";
import { perks, items, abilities, armory, arena } from "@/assets";

export const useGameStore = defineStore("game", () => {
  const router = useRouter();
  const fightTurn = ref<FightTurn>(FightTurn.NONE);
  const currentCutsceneId = ref<CutsceneId>(CutsceneId.INTRO);
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
      onClick: () => toggleDrawer(DrawerState.ABILITIES, "Abilities"),
      image: abilities,
    },
    {
      onClick: () => toggleDrawer(DrawerState.PERKS, "Perks"),
      image: perks,
    },
    {
      onClick: () => toggleDrawer(DrawerState.ARMORY, "Armory"),
      image: armory,
    },
    {
      onClick: () => toggleDrawer(DrawerState.ITEMS, "Items"),
      image: items,
    },
    {
      onClick: () => router.push(ROUTES.combat),
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
  };
});
