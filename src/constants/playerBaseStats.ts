import { StatKey } from "@/enums";

export const PLAYER_BASE_STATS: Record<StatKey, number> = {
  [StatKey.LEVEL]: 1,
  [StatKey.HEALTH]: 50,
  [StatKey.MAX_HEALTH]: 50,
  [StatKey.STAMINA]: 50,
  [StatKey.MAX_STAMINA]: 50,
  [StatKey.STRENGTH]: 10,
  [StatKey.MAX_STRENGTH]: 10,
  [StatKey.DEFENSE]: 10,
  [StatKey.MAX_DEFENSE]: 10,
  [StatKey.EXPERIENCE]: 0,
  [StatKey.MAX_EXPERIENCE]: 100,
  [StatKey.POINTS]: 0,
  [StatKey.GOLD]: 0,
};
