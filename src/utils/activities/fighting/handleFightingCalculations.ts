import type { Gladiator, Enemy } from "@/types";
import { handleStat, didEvade, calculateDamage, createMessage } from "@/utils";

import { DODGE_MESSAGES } from "@/constants";

export default function handleFightingCalculations(
  gladiator: Gladiator,
  enemy: Enemy
) {
  const attacker = gladiator.hasTurn ? gladiator : enemy;
  const defender = gladiator.hasTurn ? enemy : gladiator;

  const damage = didEvade(defender as any)
    ? 0
    : calculateDamage(attacker, defender);

  if (!damage) {
    createMessage(
      attacker.messages,
      DODGE_MESSAGES,
      attacker.id,
      attacker.name
    );
  }

  handleStat(attacker as any, "stamina", 5, "decrease");
  handleStat(defender as any, "health", damage, "decrease");
  attacker.hasTurn = false;
  defender.hasTurn = true;
}
