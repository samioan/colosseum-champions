import type { Gladiator } from "@/types";
import { handleStat } from "@/utils";

export default function performAbility(
  abilityId: string,
  attacker: Gladiator,
  defender: Gladiator
) {
  switch (abilityId) {
    case "smash": {
      handleStat(defender, "stamina", attacker.strength * 2, "decrease");
      return;
    }
    case "slash": {
      handleStat(defender, "health", attacker.strength * 5, "decrease");
      return;
    }
    case "strike": {
      handleStat(defender, "health", attacker.strength, "decrease");
      handleStat(defender, "stamina", attacker.strength, "decrease");
      return;
    }
    case "bash": {
      handleStat(defender, "strength", attacker.strength, "decrease");
      return;
    }
    case "slice": {
      handleStat(defender, "defense", attacker.strength, "decrease");
      return;
    }
    default:
      return;
  }
}
