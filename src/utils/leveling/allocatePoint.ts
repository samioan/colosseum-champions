import type { Gladiator } from "@/types";
import { handleStat } from "@/utils";
import { StatAction, StatKey } from "@/enums";

export default function allocatePoint(
  gladiator: Gladiator,
  stats: {
    statKey: StatKey;
    value: number;
  }[]
) {
  handleStat(gladiator, StatKey.POINTS, 1, StatAction.DECREASE);
  stats.forEach((stat) =>
    handleStat(gladiator, stat.statKey, stat.value, StatAction.INCREASE)
  );
}
