import { StatKey } from "@/enums";

export const PLAYER_BASE_STATS: Record<StatKey, number> = {
  [StatKey.LEVEL]: 1,
  [StatKey.HEALTH]: 10,
  [StatKey.MAX_HEALTH]: 10,
  [StatKey.STAMINA]: 10,
  [StatKey.MAX_STAMINA]: 10,
  [StatKey.STRENGTH]: 5,
  [StatKey.MAX_STRENGTH]: 5,
  [StatKey.DEFENSE]: 5,
  [StatKey.MAX_DEFENSE]: 5,
  [StatKey.EXPERIENCE]: 0,
  [StatKey.MAX_EXPERIENCE]: 100,
  [StatKey.POINTS]: 0,
  [StatKey.GOLD]: 0,
};
