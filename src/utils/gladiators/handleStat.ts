import type { Gladiator, StatOperation } from "@/types";

export default function handleStat<K extends keyof Gladiator>(
  gladiator: Gladiator,
  statKey: K,
  value: number,
  operation: StatOperation
) {
  switch (operation) {
    case "increment":
      (gladiator[statKey] as number) += value;
      break;
    case "decrement":
      (gladiator[statKey] as number) -= value;
      break;
    case "set":
      (gladiator[statKey] as number) = value;
      break;
  }
}
