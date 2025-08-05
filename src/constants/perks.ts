import type { Perk } from "@/types";
import { StatKey } from "@/enums";

export const PERKS: Perk[] = [
  {
    id: "agile",
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
  {
    id: "defensive",
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
  {
    id: "strong",
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
  {
    id: "tireless",
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
];
