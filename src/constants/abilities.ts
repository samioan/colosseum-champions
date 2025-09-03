import type { Ability } from "@/types";
import {
  StatKey,
  AbilityId,
  AbilityType,
  Operator,
  BonusStatus,
} from "@/enums";
import { smash } from "@/assets";

export const ABILITIES: Record<AbilityId, Ability> = {
  [AbilityId.SMASH]: {
    label: "Smash",
    description: "x2 SP DMG",
    image: smash,
    stamina: 10,
    cooldown: 0,
    maxCooldown: 2,
    points: 2,
    status: BonusStatus.LOCKED,
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
    description: "x5 HP DMG",
    image: "",
    stamina: 15,
    cooldown: 0,
    maxCooldown: 3,
    points: 4,
    status: BonusStatus.LOCKED,
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
    description: "x1 HP + SP DMG",
    image: "",
    stamina: 20,
    cooldown: 0,
    maxCooldown: 2,
    points: 6,
    status: BonusStatus.LOCKED,
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
    description: "x1 STR DMG",
    image: "",
    stamina: 25,
    cooldown: 0,
    maxCooldown: 3,
    points: 8,
    status: BonusStatus.LOCKED,
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
    description: "x1 DEF DMG",
    image: "",
    stamina: 30,
    cooldown: 0,
    maxCooldown: 2,
    points: 10,
    status: BonusStatus.LOCKED,
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
    image: "",
    stamina: 10,
    cooldown: 0,
    maxCooldown: 3,
    points: 12,
    status: BonusStatus.LOCKED,
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
