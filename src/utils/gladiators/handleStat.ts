import type { Gladiator, StatOperation } from "@/types";

export default function handleStat<K extends keyof Gladiator>(
  gladiator: Gladiator,
  statKey: K,
  value: number,
  operation: StatOperation
) {
  switch (operation) {
    case "increment":
      {
        (gladiator[statKey] as number) += value;

        const maxKey = ("max" +
          statKey.charAt(0).toUpperCase() +
          statKey.slice(1)) as keyof Gladiator;

        if (maxKey in gladiator && typeof gladiator[maxKey] === "number") {
          const maxValue = gladiator[maxKey] as number;

          if ((gladiator[statKey] as number) > maxValue) {
            gladiator[statKey] = maxValue as any;
          }
        }
      }
      break;
    case "decrement":
      {
        (gladiator[statKey] as number) -= value;

        if ((gladiator[statKey] as number) < 0) {
          gladiator[statKey] = 0 as any;
        }
      }
      break;
    case "set":
      (gladiator[statKey] as number) = value;
      break;
  }
}
