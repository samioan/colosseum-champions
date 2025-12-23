import type { Perk } from "@/types";
import { StatKey, PerkId, Operator, BonusStatus } from "@/enums";
import {
  berserkersFury,
  bulwark,
  lastStand,
  shieldWall,
  vitalForce,
  ironConstitution,
  ancientStrength,
  endlessReserves,
  steadyResolve,
  steadfast,
  relentless,
  brutality,
} from "@/assets";

export const PERKS: Record<PerkId, Perk> = {
  [PerkId.LAST_STAND]: {
    label: "Last Stand",
    description: "+20% DEF when below 30% HP",
    image: lastStand,
    status: BonusStatus.LOCKED,
    points: 5,
    bonuses: [
      {
        stat: StatKey.MAX_DEFENSE,
        operator: Operator.MULTIPLICATION,
        value: 0.2,
        requirements: [
          { stat: StatKey.HEALTH, operator: Operator.LESS_THAN, value: 0.3 },
        ],
      },
    ],
  },
  [PerkId.BERSERKERS_FURY]: {
    label: "Berserker's Fury",
    description: "+20% STR when below 30% HP",
    image: berserkersFury,
    status: BonusStatus.LOCKED,
    points: 10,
    bonuses: [
      {
        stat: StatKey.MAX_STRENGTH,
        operator: Operator.MULTIPLICATION,
        value: 0.2,
        requirements: [
          { stat: StatKey.HEALTH, operator: Operator.LESS_THAN, value: 0.3 },
        ],
      },
    ],
  },
  [PerkId.IRON_CONSTITUTION]: {
    label: "Iron Constitution",
    description: "+10% MAX HP",
    image: ironConstitution,
    status: BonusStatus.LOCKED,
    points: 15,
    bonuses: [
      {
        stat: StatKey.MAX_HEALTH,
        operator: Operator.MULTIPLICATION,
        value: 0.1,
      },
    ],
  },
  [PerkId.STEADY_RESOLVE]: {
    label: "Steady Resolve",
    description: "+20% DEF when below 30% EP",
    image: steadyResolve,
    status: BonusStatus.LOCKED,
    points: 5,
    bonuses: [
      {
        stat: StatKey.MAX_DEFENSE,
        operator: Operator.MULTIPLICATION,
        value: 0.2,
        requirements: [
          { stat: StatKey.STAMINA, operator: Operator.LESS_THAN, value: 0.3 },
        ],
      },
    ],
  },
  [PerkId.ANCIENT_STRENGTH]: {
    label: "Ancient Strength",
    description: "+20% STR when below 30% EP",
    image: ancientStrength,
    status: BonusStatus.LOCKED,
    points: 10,
    bonuses: [
      {
        stat: StatKey.MAX_STRENGTH,
        operator: Operator.MULTIPLICATION,
        value: 0.2,
        requirements: [
          {
            stat: StatKey.STAMINA,
            operator: Operator.LESS_THAN,
            value: 0.3,
          },
        ],
      },
    ],
  },
  [PerkId.ENDLESS_RESERVES]: {
    label: "Endless Reserves",
    description: "+10% MAX EP",
    image: endlessReserves,
    status: BonusStatus.LOCKED,
    points: 15,
    bonuses: [
      {
        stat: StatKey.MAX_STAMINA,
        operator: Operator.MULTIPLICATION,
        value: 0.1,
      },
    ],
  },
  [PerkId.SHIELD_WALL]: {
    label: "Shield Wall",
    description: "+20% DEF when above 70% HP",
    image: shieldWall,
    status: BonusStatus.LOCKED,
    points: 5,
    bonuses: [
      {
        stat: StatKey.MAX_DEFENSE,
        operator: Operator.MULTIPLICATION,
        value: 0.2,
        requirements: [
          {
            stat: StatKey.HEALTH,
            operator: Operator.GREATER_THAN,
            value: 0.7,
          },
        ],
      },
    ],
  },
  [PerkId.RELENTLESS]: {
    label: "Relentless",
    description: "+20% STR when above 70% HP",
    image: relentless,
    status: BonusStatus.LOCKED,
    points: 5,
    bonuses: [
      {
        stat: StatKey.MAX_STRENGTH,
        operator: Operator.MULTIPLICATION,
        value: 0.2,
        requirements: [
          {
            stat: StatKey.HEALTH,
            operator: Operator.GREATER_THAN,
            value: 0.7,
          },
        ],
      },
    ],
  },
  [PerkId.BULWARK]: {
    label: "Bulwark",
    description: "+10% MAX DEF",
    image: bulwark,
    status: BonusStatus.LOCKED,
    points: 15,
    bonuses: [
      {
        stat: StatKey.MAX_DEFENSE,
        operator: Operator.MULTIPLICATION,
        value: 0.1,
      },
    ],
  },
  [PerkId.STEADFAST]: {
    label: "Steadfast",
    description: "+20% DEF when above 70% EP",
    image: steadfast,
    status: BonusStatus.LOCKED,
    points: 10,
    bonuses: [
      {
        stat: StatKey.MAX_DEFENSE,
        operator: Operator.MULTIPLICATION,
        value: 0.2,
        requirements: [
          {
            stat: StatKey.STAMINA,
            operator: Operator.GREATER_THAN,
            value: 0.7,
          },
        ],
      },
    ],
  },
  [PerkId.VITAL_FORCE]: {
    label: "Vital Force",
    description: "+20% STR when above 70% EP",
    image: vitalForce,
    status: BonusStatus.LOCKED,
    points: 10,
    bonuses: [
      {
        stat: StatKey.MAX_STRENGTH,
        operator: Operator.MULTIPLICATION,
        value: 0.2,
        requirements: [
          {
            stat: StatKey.STAMINA,
            operator: Operator.GREATER_THAN,
            value: 0.7,
          },
        ],
      },
    ],
  },
  [PerkId.BRUTALITY]: {
    label: "Brutality",
    description: "+10% MAX STR",
    image: brutality,
    status: BonusStatus.LOCKED,
    points: 15,
    bonuses: [
      {
        stat: StatKey.MAX_STRENGTH,
        operator: Operator.MULTIPLICATION,
        value: 0.1,
      },
    ],
  },
};
