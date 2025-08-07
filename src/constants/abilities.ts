import type { Ability } from "@/types";
import { StatKey, AbilityId, AbilityType } from "@/enums";

export const ABILITIES: Record<AbilityId, Ability> = {
  [AbilityId.SMASH]: {
    label: "Smash",
    description: "Deals x2 SP DMG",
    rage: 10,
    isUnlocked: false,
    isSelected: false,
    isActive: false,
    payload: [
      {
        type: AbilityType.OFFENSIVE,
        stat: StatKey.STAMINA,
        value: {
          stat: StatKey.STRENGTH,
          operator: "*",
          modifier: 2,
        },
      },
    ],
  },
  [AbilityId.SLASH]: {
    label: "Slash",
    description: "Deals x5 HP DMG",
    rage: 15,
    isUnlocked: false,
    isSelected: false,
    isActive: false,
    payload: [
      {
        type: AbilityType.OFFENSIVE,
        stat: StatKey.HEALTH,
        value: {
          stat: StatKey.STRENGTH,
          operator: "*",
          modifier: 5,
        },
      },
    ],
  },
  [AbilityId.STRIKE]: {
    label: "Strike",
    description: "Deals x1 HP + SP DMG",
    rage: 20,
    isUnlocked: false,
    isSelected: false,
    isActive: false,
    payload: [
      {
        type: AbilityType.OFFENSIVE,
        stat: StatKey.HEALTH,
        value: {
          stat: StatKey.STRENGTH,
        },
      },
      {
        type: AbilityType.OFFENSIVE,
        stat: StatKey.STAMINA,
        value: {
          stat: StatKey.STRENGTH,
        },
      },
    ],
  },
  [AbilityId.BASH]: {
    label: "Bash",
    description: "Deals x1 STR DMG",
    rage: 25,
    isUnlocked: false,
    isSelected: false,
    isActive: false,
    payload: [
      {
        type: AbilityType.OFFENSIVE,
        stat: StatKey.STRENGTH,
        value: {
          stat: StatKey.STRENGTH,
        },
      },
    ],
  },
  [AbilityId.SLICE]: {
    label: "Slice",
    description: "Deals x1 DEF DMG",
    rage: 30,
    isUnlocked: false,
    isSelected: false,
    isActive: false,
    payload: [
      {
        type: AbilityType.OFFENSIVE,
        stat: StatKey.DEFENSE,
        value: {
          stat: StatKey.STRENGTH,
        },
      },
    ],
  },
  [AbilityId.HEAL]: {
    label: "Heal",
    description: "Heals x1 HP",
    rage: 10,
    isUnlocked: false,
    isSelected: false,
    isActive: false,
    payload: [
      {
        type: AbilityType.DEFENSIVE,
        stat: StatKey.HEALTH,
        value: {
          stat: StatKey.STRENGTH,
          operator: "*",
          modifier: 2,
        },
      },
    ],
  },
};
