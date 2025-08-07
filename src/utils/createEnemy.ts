import type { Gladiator } from "@/types";
import { createName, getRandomRange } from "@/utils";
import { ENEMY_STAT_RANGES, ABILITIES, PERKS } from "@/constants";
import { StatKey } from "@/enums";

export default function createEnemy(gladiatorLevel: number = 1) {
  const ranges = ENEMY_STAT_RANGES;

  const maxHealth =
    getRandomRange(ranges.HEALTH.min, ranges.HEALTH.max) * gladiatorLevel;
  const maxStamina =
    getRandomRange(ranges.STAMINA.min, ranges.STAMINA.max) * gladiatorLevel;
  const maxRage =
    getRandomRange(ranges.RAGE.min, ranges.RAGE.max) * gladiatorLevel;
  const strength =
    getRandomRange(ranges.STRENGTH.min, ranges.STRENGTH.max) * gladiatorLevel;
  const defense =
    getRandomRange(ranges.DEFENSE.min, ranges.DEFENSE.max) * gladiatorLevel;
  const dexterity =
    getRandomRange(ranges.DEXTERITY.min, ranges.DEXTERITY.max) * gladiatorLevel;
  const ability =
    Object.values(ABILITIES)[
      Math.floor(Math.random() * Object.values(ABILITIES).length)
    ];
  const perk =
    Object.values(PERKS)[
      Math.floor(Math.random() * Object.values(PERKS).length)
    ];

  const enemy: Gladiator = {
    name: createName(),
    stats: {
      [StatKey.LEVEL]: gladiatorLevel,
      [StatKey.HEALTH]: maxHealth,
      [StatKey.MAX_HEALTH]: maxHealth,
      [StatKey.STAMINA]: maxStamina,
      [StatKey.MAX_STAMINA]: maxStamina,
      [StatKey.RAGE]: 0,
      [StatKey.MAX_RAGE]: maxRage,
      [StatKey.STRENGTH]: strength,
      [StatKey.MAX_STRENGTH]: strength,
      [StatKey.DEFENSE]: defense,
      [StatKey.MAX_DEFENSE]: defense,
      [StatKey.DEXTERITY]: dexterity,
      [StatKey.MAX_DEXTERITY]: dexterity,
      [StatKey.EXPERIENCE]: 0,
      [StatKey.MAX_EXPERIENCE]: 0,
      [StatKey.POINTS]: 0,
      [StatKey.GOLD]: 0,
    },
    hasTurn: false,
    abilities: [ability].map((ability) => ({
      ...ability,
      isActive: true,
    })),
    perks: [perk].map((perk) => ({
      ...perk,
      isSelected: true,
    })),
    items: [],
  };

  return enemy;
}
