import type { Gladiator } from "@/types";
import {
  handleStat,
  didEvade,
  calculateDamage,
  createMessage,
  performAbility,
} from "@/utils";

import { DODGE_MESSAGES } from "@/constants";

export default function handleFightingCalculations(
  gladiator: Gladiator,
  enemy: Gladiator
) {
  const attacker = gladiator.hasTurn ? gladiator : enemy;
  const defender = gladiator.hasTurn ? enemy : gladiator;

  const ability = attacker?.abilities?.find((ability) => ability.isActive);

  if (ability && attacker.rage >= ability.rage) {
    handleStat(attacker, "rage", ability.rage, "decrease");
    performAbility(ability.id, attacker, defender);
    createMessage(
      attacker.messages,
      [`uses ${ability.label}!`],
      attacker.id,
      attacker.name
    );
  } else {
    const damage = didEvade(defender) ? 0 : calculateDamage(attacker, defender);

    if (!damage) {
      createMessage(
        attacker.messages,
        DODGE_MESSAGES,
        attacker.id,
        attacker.name
      );
    }

    handleStat(attacker, "stamina", 5, "decrease");
    handleStat(attacker, "rage", 5, "increase");
    handleStat(defender, "health", damage, "decrease");
  }

  attacker.hasTurn = false;
  defender.hasTurn = true;
}
