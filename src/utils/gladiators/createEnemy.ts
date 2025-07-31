import type { Enemy } from "@/types";
import { createName, getRandomRange } from "@/utils";
import { ENEMY_STAT_RANGES } from "@/constants";
import { v4 as uuidv4 } from "uuid";

export default function createEnemy(id: string, gladiatorLevel: number) {
  const ranges = ENEMY_STAT_RANGES;

  const maxHealth =
    getRandomRange(ranges.HEALTH.min, ranges.HEALTH.max) * gladiatorLevel;
  const maxStamina =
    getRandomRange(ranges.STAMINA.min, ranges.STAMINA.max) * gladiatorLevel;
  const strength =
    getRandomRange(ranges.STRENGTH.min, ranges.STRENGTH.max) * gladiatorLevel;
  const defense =
    getRandomRange(ranges.DEFENSE.min, ranges.DEFENSE.max) * gladiatorLevel;
  const dexterity =
    getRandomRange(ranges.DEXTERITY.min, ranges.DEXTERITY.max) * gladiatorLevel;

  const enemy: Enemy = {
    id: uuidv4(),
    gladiatorId: id,
    name: createName(),
    level: gladiatorLevel,
    health: maxHealth,
    maxHealth,
    stamina: maxStamina,
    maxStamina,
    strength,
    defense,
    dexterity,
    messages: [],
    hasTurn: false,
  };

  return enemy;
}
