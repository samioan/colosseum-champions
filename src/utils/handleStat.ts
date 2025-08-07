import type { Gladiator } from "@/types";
import { StatAction, StatKey } from "@/enums";

export default function handleStat(
  gladiator: Gladiator,
  statKey: StatKey,
  value: number,
  operation: StatAction
) {
  switch (operation) {
    case StatAction.INCREASE:
      {
        gladiator.stats[statKey] += value;

        const maxKey = ("max" +
          statKey.charAt(0).toUpperCase() +
          statKey.slice(1)) as StatKey;

        if (maxKey in gladiator.stats && maxKey !== StatKey.MAX_EXPERIENCE) {
          const maxValue = gladiator.stats[maxKey];

          if (gladiator.stats[statKey] > maxValue) {
            gladiator.stats[statKey] = maxValue;
          }
        }
      }
      break;
    case StatAction.DECREASE:
      {
        gladiator.stats[statKey] -= value;

        if (gladiator.stats[statKey] < 0) {
          gladiator.stats[statKey] = 0;
        }
      }
      break;
    case StatAction.SET:
      gladiator.stats[statKey] = value;
      break;
  }
}
