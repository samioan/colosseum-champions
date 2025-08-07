import { Label } from "@/enums";

export const LABELS: Record<Label, string> = {
  [Label.HEALTH]: "HP",
  [Label.STAMINA]: "SP",
  [Label.RAGE]: "RP",
  [Label.EXPERIENCE]: "XP",
  [Label.STRENGTH]: "STR",
  [Label.DEXTERITY]: "DEX",
  [Label.DEFENSE]: "DEF",
  [Label.GOLD]: "GOLD",
  [Label.FIGHT]: "F",
  [Label.CONTINUE]: "Continue",
  [Label.LEVEL]: "Lv",
  [Label.NEW_GAME]: "New Game",
  [Label.LOAD_GAME]: "Load Game",
  [Label.POINTS]: "POINTS",
  [Label.CODEX]: "C",
  [Label.ARMORY]: "A",
  [Label.ITEMS]: "I",
};
