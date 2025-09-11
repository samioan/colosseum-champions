import type { GladiatorStats } from "@/types";
import { handleStat } from "@/utils";
import { StatAction, StatKey } from "@/enums";
import type { Ref } from "vue";

export default function checkForLevelUp(
  stats: GladiatorStats,
  updatedStats: GladiatorStats,
  pointsCollected: Ref<number>
) {
  while (stats.experience >= stats.maxExperience) {
    handleStat(stats, StatKey.LEVEL, 1, StatAction.INCREASE, updatedStats);
    handleStat(stats, StatKey.POINTS, 3, StatAction.INCREASE, updatedStats);
    pointsCollected.value += 3;
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
      Math.floor(100 * Math.pow(stats.level, 1)),
      StatAction.SET,
      updatedStats
    );
  }
}
