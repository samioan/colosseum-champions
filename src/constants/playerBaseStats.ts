import { StatKey } from "@/enums";

export const PLAYER_BASE_STATS: Record<StatKey, number> = {
  [StatKey.LEVEL]: 1,
  [StatKey.HEALTH]: 1000,
  [StatKey.MAX_HEALTH]: 1000,
  [StatKey.STAMINA]: 1000,
  [StatKey.MAX_STAMINA]: 1000,
  [StatKey.STRENGTH]: 100,
  [StatKey.MAX_STRENGTH]: 100,
  [StatKey.DEFENSE]: 100,
  [StatKey.MAX_DEFENSE]: 100,
  [StatKey.EXPERIENCE]: 0,
  [StatKey.MAX_EXPERIENCE]: 100,
  [StatKey.POINTS]: 15,
  [StatKey.GOLD]: 100,
};
