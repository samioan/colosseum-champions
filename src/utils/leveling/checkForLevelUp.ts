import type { Gladiator } from "@/types";
import { handleStat, getExpForNextLevel } from "@/utils";
import { StatAction, StatKey } from "@/enums";

export default function checkForLevelUp(gladiator: Gladiator) {
  if (gladiator.experience >= gladiator.maxExperience) {
    handleStat(gladiator, StatKey.LEVEL, 1, StatAction.INCREASE);
    handleStat(gladiator, StatKey.POINTS, 20, StatAction.INCREASE);
    handleStat(gladiator, StatKey.EXPERIENCE, 0, StatAction.SET);
    handleStat(
      gladiator,
      StatKey.MAX_EXPERIENCE,
      getExpForNextLevel(100, 1.2, gladiator.level),
      StatAction.SET
    );
  }
}
