import type { Gladiator } from "@/types";
import { handleStat } from "@/utils";

export default function allocatePoint<K extends keyof Gladiator>(
  gladiator: Gladiator,
  statKey: K,
  value: number
) {
  handleStat(gladiator, "points", 1, "decrement");
  handleStat(gladiator, statKey, value, "increment");
}
