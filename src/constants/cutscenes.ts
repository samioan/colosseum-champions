import { CutsceneId } from "@/enums";
import type { Cutscene } from "@/types";
import { scene1, scene2 } from "@/assets";

export const CUTSCENES: Record<CutsceneId, Cutscene> = {
  [CutsceneId.INTRO]: {
    images: [
      scene1,
      scene1,
      scene1,
      scene1,
      scene2,
      scene2,
      scene2,
      scene2,
      scene2,
    ],
    texts: [
      "All my life, I was nothing but a slave. ",
      "Chained. Sold. Forgotten.",
      "Now I stand in the arena, where only survival matters.",
      "The crowd cheers for blood and death.",
      "But with each fight I come closer to freedom.",
      "With each victory I come closer to glory.",
      "This is my chance to be more than a slave.",
      "My chance to leave a mark that will never be forgotten.",
      "My chance… to become a legend.",
    ],
  },
};
