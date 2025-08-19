import type { Perk } from "@/types";
import { StatKey, PerkId, Operator } from "@/enums";

export const PERKS: Record<PerkId, Perk> = {
  [PerkId.AGILE]: {
    label: "Agile",
    description: "DEX * 2 when below 25% HP",
    isUnlocked: false,
    isEquipped: false,
    points: 2,
    bonuses: [
      {
        stat: StatKey.MAX_DEXTERITY,
        operator: Operator.MULTIPLICATION,
        value: 2,
        requirements: [
          { stat: StatKey.HEALTH, operator: Operator.LESS_THAN, value: 0.25 },
        ],
      },
    ],
  },
  [PerkId.DEFENSIVE]: {
    label: "Defensive",
    description: "DEF * 2 when below 25% SP",
    isUnlocked: false,
    isEquipped: false,
    points: 4,
    bonuses: [
      {
        stat: StatKey.MAX_DEFENSE,
        operator: Operator.MULTIPLICATION,
        value: 2,
        requirements: [
          { stat: StatKey.STAMINA, operator: Operator.LESS_THAN, value: 0.25 },
        ],
      },
    ],
  },
  [PerkId.STRONG]: {
    label: "Strong",
    description: "STR * 2 when below 25% HP and 25% SP",
    isUnlocked: false,
    isEquipped: false,
    points: 6,
    bonuses: [
      {
        stat: StatKey.MAX_STRENGTH,
        operator: Operator.MULTIPLICATION,
        value: 2,
        requirements: [
          { stat: StatKey.HEALTH, operator: Operator.LESS_THAN, value: 0.25 },
          { stat: StatKey.STAMINA, operator: Operator.LESS_THAN, value: 0.25 },
        ],
      },
    ],
  },
  [PerkId.TIRELESS]: {
    label: "Tireless",
    description: "Max SP * 2",
    isUnlocked: false,
    isEquipped: false,
    points: 8,
    bonuses: [
      {
        stat: StatKey.MAX_STAMINA,
        operator: Operator.MULTIPLICATION,
        value: 2,
      },
    ],
  },
};
