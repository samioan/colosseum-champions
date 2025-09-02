import { CutsceneId } from "@/enums";
import type { Cutscene } from "@/types";
import { scene1, scene2 } from "@/assets";

export const CUTSCENES: Record<CutsceneId, Cutscene> = {
  [CutsceneId.STAGE_1]: {
    images: [scene1, scene1, scene1, scene1, scene1, scene1, scene1, scene1],
    texts: [
      "All my life, I was nothing but a slave.",
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
  [CutsceneId.STAGE_5]: {
    images: [scene2],
    texts: ["Stage 5 Cutscene"],
  },
  [CutsceneId.STAGE_10]: {
    images: [scene2],
    texts: ["Stage 10 Cutscene"],
  },
  [CutsceneId.STAGE_15]: {
    images: [scene2],
    texts: ["Stage 15 Cutscene"],
  },
  [CutsceneId.STAGE_20]: {
    images: [scene2],
    texts: ["Stage 20 Cutscene"],
  },
};
