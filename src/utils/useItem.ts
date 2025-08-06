import { StatAction } from "@/enums";
import type { Gladiator, Item } from "@/types";
import { handleStat } from "@/utils";

export default function useItem(item: Item, gladiator: Gladiator) {
  item.bonuses.forEach((bonus, index) => {
    function calculateValue() {
      switch (bonus.value.operator) {
        case "*":
          return Math.floor(
            gladiator.stats[bonus.value.stat] * bonus.value.modifier
          );
        default:
          return 0;
      }
    }

    function calculateAction() {
      switch (bonus.operator) {
        case "+":
          return StatAction.INCREASE;
        default:
          return StatAction.SET;
      }
    }

    function calculateCanUse() {
      switch (calculateAction()) {
        case StatAction.INCREASE:
          return (
            gladiator.stats[bonus.stat] < gladiator.stats[bonus.value.stat]
          );
        default:
          return;
      }
    }

    if (!calculateCanUse()) return;
    else {
      handleStat(gladiator, bonus.stat, calculateValue(), calculateAction());
      if (index === item.bonuses.length - 1) {
        item.amount -= 1;
      }
    }
  });
}
