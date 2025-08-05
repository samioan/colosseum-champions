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
        gladiator[statKey] += value;

        const maxKey = ("max" +
          statKey.charAt(0).toUpperCase() +
          statKey.slice(1)) as StatKey;

        if (maxKey in gladiator) {
          const maxValue = gladiator[maxKey];

          if (gladiator[statKey] > maxValue) {
            gladiator[statKey] = maxValue;
          }
        }
      }
      break;
    case StatAction.DECREASE:
      {
        gladiator[statKey] -= value;

        if (gladiator[statKey] < 0) {
          gladiator[statKey] = 0;
        }
      }
      break;
    case StatAction.SET:
      gladiator[statKey] = value;
      break;
  }
}
