import { getRandomRange } from "@/utils";
import { NAMES, SURNAMES } from "@/constants";
import type { StatRanges } from "@/types";

export default function createBaseGladiator(
  level: number,
  statRanges: StatRanges
) {
  const name = `${NAMES[Math.floor(Math.random() * NAMES.length)]} ${
    SURNAMES[Math.floor(Math.random() * SURNAMES.length)]
  }`;
  const maxHealth =
    getRandomRange(statRanges.health.min, statRanges.health.max) * level;
  const maxStamina =
    getRandomRange(statRanges.stamina.min, statRanges.stamina.max) * level;
  const strength =
    getRandomRange(statRanges.strength.min, statRanges.strength.max) * level;
  const defense =
    getRandomRange(statRanges.defense.min, statRanges.defense.max) * level;
  const dexterity =
    getRandomRange(statRanges.dexterity.min, statRanges.dexterity.max) * level;

  return {
    name: name,
    level,
    health: maxHealth,
    maxHealth,
    stamina: maxStamina,
    maxStamina,
    strength,
    defense,
    dexterity,
  };
}
