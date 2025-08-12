import type { GladiatorStats } from "@/types";
import { handleStat } from "@/utils";
import { StatAction, StatKey } from "@/enums";

export default function checkForLevelUp(
  stats: GladiatorStats,
  updatedStats: GladiatorStats
) {
  while (stats.experience >= stats.maxExperience) {
    handleStat(stats, StatKey.LEVEL, 1, StatAction.INCREASE, updatedStats);
    handleStat(stats, StatKey.POINTS, 20, StatAction.INCREASE, updatedStats);
    handleStat(
      stats,
      StatKey.EXPERIENCE,
      stats.maxExperience,
      StatAction.DECREASE,
      updatedStats
    );
    handleStat(
      stats,
      StatKey.MAX_EXPERIENCE,
      Math.floor(100 * Math.pow(stats.level, 1.2)),
      StatAction.SET,
      updatedStats
    );
  }
}
