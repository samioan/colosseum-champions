import type { GladiatorStats } from "@/types";
import { StatAction, StatKey } from "@/enums";

export default function handleStat(
  stats: GladiatorStats,
  statKey: StatKey,
  value: number,
  operation: StatAction,
  updatedStats: GladiatorStats
) {
  switch (operation) {
    case StatAction.INCREASE:
      {
        stats[statKey] += value;

        const maxKey = ("max" +
          statKey.charAt(0).toUpperCase() +
          statKey.slice(1)) as StatKey;

        if (maxKey in stats && maxKey !== StatKey.MAX_EXPERIENCE) {
          const maxValue = updatedStats[maxKey];

          if (stats[statKey] > maxValue) {
            stats[statKey] = maxValue;
          }
        }
      }
      break;
    case StatAction.DECREASE:
      {
        stats[statKey] -= value;

        if (stats[statKey] < 0) {
          stats[statKey] = 0;
        }
      }
      break;
    case StatAction.SET:
      stats[statKey] = value;
      break;
  }
}
