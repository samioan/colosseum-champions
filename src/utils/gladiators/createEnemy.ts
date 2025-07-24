import type { Enemy } from "@/types";
import { createBaseGladiator, getRandomRange } from "@/utils";
import {
  ENEMIES_HEALTH_RANGES,
  ENEMIES_STAMINA_RANGES,
  ENEMIES_STRENGTH_RANGES,
  ENEMIES_DEFENSE_RANGES,
  ENEMIES_DEXTERITY_RANGES,
} from "@/constants";

export default function createEnemy(
  id: string,
  enemies: Enemy[],
  gladiatorLevel: number
) {
  const statRanges = {
    health: ENEMIES_HEALTH_RANGES,
    stamina: ENEMIES_STAMINA_RANGES,
    strength: ENEMIES_STRENGTH_RANGES,
    defense: ENEMIES_DEFENSE_RANGES,
    dexterity: ENEMIES_DEXTERITY_RANGES,
  };

  const baseStats = createBaseGladiator(
    getRandomRange(gladiatorLevel - 2, gladiatorLevel + 2),
    statRanges
  );

  const enemy: Enemy = {
    id: id,
    ...baseStats,
  };

  enemies.push(enemy);
}
