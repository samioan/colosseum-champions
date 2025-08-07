import { StatKey } from "@/enums";

export const GLADIATOR_BASE_STATS: Record<StatKey, number> = {
  [StatKey.LEVEL]: 1,
  [StatKey.HEALTH]: 100,
  [StatKey.MAX_HEALTH]: 100,
  [StatKey.STAMINA]: 100,
  [StatKey.MAX_STAMINA]: 100,
  [StatKey.RAGE]: 0,
  [StatKey.MAX_RAGE]: 100,
  [StatKey.STRENGTH]: 10,
  [StatKey.MAX_STRENGTH]: 10,
  [StatKey.DEXTERITY]: 10,
  [StatKey.MAX_DEXTERITY]: 10,
  [StatKey.DEFENSE]: 10,
  [StatKey.MAX_DEFENSE]: 10,
  [StatKey.EXPERIENCE]: 0,
  [StatKey.MAX_EXPERIENCE]: 100,
  [StatKey.POINTS]: 15,
  [StatKey.GOLD]: 100,
};
