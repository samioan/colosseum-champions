import type { Gladiator } from "@/types";
import { handleStat } from "@/utils";

export default function allocatePoint<K extends keyof Gladiator>(
  gladiator: Gladiator,
  stats: {
    statKey: K;
    value: number;
  }[]
) {
  handleStat(gladiator, "points", 1, "decrease");
  stats.forEach((stat) =>
    handleStat(gladiator, stat.statKey, stat.value, "increase")
  );
}
