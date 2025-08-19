import type { Ability } from "@/types";
import { StatKey, AbilityId, AbilityType, Operator } from "@/enums";

export const ABILITIES: Record<AbilityId, Ability> = {
  [AbilityId.SMASH]: {
    label: "Smash",
    description: "Deals x2 SP DMG",
    stamina: 10,
    cooldown: 0,
    maxCooldown: 2,
    points: 2,
    isUnlocked: false,
    isEquipped: false,
    isActive: false,
    payload: [
      {
        type: AbilityType.OFFENSIVE,
        stat: StatKey.STAMINA,
        value: {
          stat: StatKey.STRENGTH,
          operator: Operator.MULTIPLICATION,
          modifier: 2,
        },
      },
    ],
  },
  [AbilityId.SLASH]: {
    label: "Slash",
    description: "Deals x5 HP DMG",
    stamina: 15,
    cooldown: 0,
    maxCooldown: 3,
    points: 4,
    isUnlocked: false,
    isEquipped: false,
    isActive: false,
    payload: [
      {
        type: AbilityType.OFFENSIVE,
        stat: StatKey.HEALTH,
        value: {
          stat: StatKey.STRENGTH,
          operator: Operator.MULTIPLICATION,
          modifier: 5,
        },
      },
    ],
  },
  [AbilityId.STRIKE]: {
    label: "Strike",
    description: "Deals x1 HP + SP DMG",
    stamina: 20,
    cooldown: 0,
    maxCooldown: 2,
    points: 6,
    isUnlocked: false,
    isEquipped: false,
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
    stamina: 25,
    cooldown: 0,
    maxCooldown: 3,
    points: 8,
    isUnlocked: false,
    isEquipped: false,
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
    stamina: 30,
    cooldown: 0,
    maxCooldown: 2,
    points: 10,
    isUnlocked: false,
    isEquipped: false,
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
    stamina: 10,
    cooldown: 0,
    maxCooldown: 3,
    points: 12,
    isUnlocked: false,
    isEquipped: false,
    isActive: false,
    payload: [
      {
        type: AbilityType.DEFENSIVE,
        stat: StatKey.HEALTH,
        value: {
          stat: StatKey.STRENGTH,
          operator: Operator.MULTIPLICATION,
          modifier: 2,
        },
      },
    ],
  },
};
