import { StatAction, StatKey } from "@/enums";
import type { GladiatorStats, Item } from "@/types";
import { handleStat } from "@/utils";

export default function useItem(
  item: Item,
  stats: GladiatorStats,
  updatedStats: GladiatorStats
) {
  let usedItem = false;

  item.stats.forEach((stat) => {
    const maxStat = `max${stat.charAt(0).toUpperCase()}${stat.slice(
      1
    )}` as StatKey;

    function calculateValue() {
      return item.modifier < 1
        ? Math.floor(updatedStats[maxStat] * item.modifier)
        : item.modifier;
    }

    function calculateCanUse() {
      return item.modifier < 1 ? stats[stat] < updatedStats[maxStat] : true;
    }

    if (calculateCanUse()) {
      handleStat(
        stats,
        stat,
        calculateValue(),
        StatAction.INCREASE,
        updatedStats
      );

      usedItem = true;
    }
  });

  if (usedItem) {
    item.amount -= 1;
    usedItem = false;
  }
}
