import type { Perk } from "@/types";
import { StatKey, PerkId } from "@/enums";

export const PERKS: Record<PerkId, Perk> = {
  [PerkId.AGILE]: {
    label: "Agile",
    description: "DEX * 2 when below 25% HP",
    isUnlocked: false,
    isSelected: false,
    bonuses: [
      {
        stat: StatKey.DEXTERITY,
        operator: "*",
        value: 2,
        requirements: [{ stat: StatKey.HEALTH, operator: "<", value: 0.25 }],
      },
    ],
  },
  [PerkId.DEFENSIVE]: {
    label: "Defensive",
    description: "DEF * 2 when below 25% SP",
    isUnlocked: false,
    isSelected: false,
    bonuses: [
      {
        stat: StatKey.DEFENSE,
        operator: "*",
        value: 2,
        requirements: [{ stat: StatKey.STAMINA, operator: "<", value: 0.25 }],
      },
    ],
  },
  [PerkId.STRONG]: {
    label: "Strong",
    description: "STR * 2 when below 25% HP and 25% SP",
    isUnlocked: false,
    isSelected: false,
    bonuses: [
      {
        stat: StatKey.STRENGTH,
        operator: "*",
        value: 2,
        requirements: [
          { stat: StatKey.HEALTH, operator: "<", value: 0.25 },
          { stat: StatKey.STAMINA, operator: "<", value: 0.25 },
        ],
      },
    ],
  },
  [PerkId.TIRELESS]: {
    label: "Tireless",
    description: "Max SP * 2",
    isUnlocked: false,
    isSelected: false,
    bonuses: [
      {
        stat: StatKey.MAX_STAMINA,
        operator: "*",
        value: 2,
      },
    ],
  },
};
