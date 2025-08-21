import { Operator, StatAction } from "@/enums";
import type { GladiatorStats, Item } from "@/types";
import { handleStat } from "@/utils";

export default function useItem(
  item: Item,
  stats: GladiatorStats,
  updatedStats: GladiatorStats
) {
  item.bonuses.forEach((bonus, index) => {
    function calculateValue() {
      switch (bonus.value.operator) {
        case Operator.MULTIPLICATION:
          return Math.floor(stats[bonus.value.stat] * bonus.value.modifier);
        default:
          return 0;
      }
    }

    function calculateAction() {
      switch (bonus.operator) {
        case Operator.ADDITION:
          return StatAction.INCREASE;
        default:
          return StatAction.SET;
      }
    }

    function calculateCanUse() {
      switch (calculateAction()) {
        case StatAction.INCREASE:
          return stats[bonus.stat] < updatedStats[bonus.value.stat];
        default:
          return;
      }
    }

    console.log(
      calculateCanUse(),
      stats[bonus.stat],
      updatedStats[bonus.value.stat]
    );

    if (!calculateCanUse()) return;
    else {
      handleStat(
        stats,
        bonus.stat,
        calculateValue(),
        calculateAction(),
        updatedStats
      );
      if (index === item.bonuses.length - 1) {
        item.amount -= 1;
      }
    }
  });
}
