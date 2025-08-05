import type { Gladiator } from "@/types";
import { createName, getRandomRange } from "@/utils";
import { ENEMY_STAT_RANGES, ABILITIES, PERKS } from "@/constants";
import { v4 as uuidv4 } from "uuid";
import { ActivityState } from "@/enums";

export default function createEnemy(id: string, gladiatorLevel: number) {
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
  const ability = ABILITIES[Math.floor(Math.random() * ABILITIES.length)];
  const perk = PERKS[Math.floor(Math.random() * PERKS.length)];

  const enemy: Gladiator = {
    id: uuidv4(),
    gladiatorId: id,
    name: createName(),
    level: gladiatorLevel,
    health: maxHealth,
    maxHealth,
    stamina: maxStamina,
    maxStamina,
    rage: 0,
    maxRage,
    strength,
    defense,
    dexterity,
    messages: [],
    hasTurn: false,
    experience: 0,
    maxExperience: 0,
    points: 0,
    activity: ActivityState.FIGHTING,
    gold: 0,
    abilities: [ability].map((ability) => ({
      ...ability,
      isActive: true,
    })),
    perks: [perk].map((perk) => ({
      ...perk,
      isSelected: true,
    })),
  };

  return enemy;
}
