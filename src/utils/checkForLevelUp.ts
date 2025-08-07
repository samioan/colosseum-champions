import type { Gladiator } from "@/types";
import { handleStat } from "@/utils";
import { StatAction, StatKey } from "@/enums";

export default function checkForLevelUp(gladiator: Gladiator) {
  while (gladiator.stats.experience >= gladiator.stats.maxExperience) {
    handleStat(gladiator, StatKey.LEVEL, 1, StatAction.INCREASE);
    handleStat(gladiator, StatKey.POINTS, 20, StatAction.INCREASE);
    handleStat(
      gladiator,
      StatKey.EXPERIENCE,
      gladiator.stats.maxExperience,
      StatAction.DECREASE
    );
    handleStat(
      gladiator,
      StatKey.MAX_EXPERIENCE,
      Math.floor(100 * Math.pow(gladiator.stats.level, 1.2)),
      StatAction.SET
    );
  }
}
