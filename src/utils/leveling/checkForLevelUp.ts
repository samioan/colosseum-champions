import type { Gladiator } from "@/types";
import { handleStat, getExpForNextLevel } from "@/utils";

export default function checkForLevelUp(gladiator: Gladiator) {
  if (gladiator.experience >= gladiator.maxExperience) {
    handleStat(gladiator, "level", 1, "increase");
    handleStat(gladiator, "points", 20, "increase");
    handleStat(gladiator, "experience", 0, "set");
    handleStat(
      gladiator,
      "maxExperience",
      getExpForNextLevel(100, 1.2, gladiator.level),
      "set"
    );
  }
}
