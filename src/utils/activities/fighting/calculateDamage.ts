import type { Gladiator } from "@/types";
import { createMessage, getRandomRange } from "@/utils";
import { DAMAGE_MESSAGES, CRITICAL_MESSAGES } from "@/constants";

export default function calculateDamage(
  attacker: Gladiator,
  defender: Gladiator
) {
  let damage = attacker.stats.strength * (100 / (100 + defender.stats.defense));

  const critChance =
    attacker.stats.dexterity / (attacker.stats.dexterity + 200);
  const isCrit = Math.random() < critChance;

  if (isCrit) {
    damage *= 5;
  }

  createMessage(
    attacker.messages,
    isCrit ? CRITICAL_MESSAGES : DAMAGE_MESSAGES,
    attacker.id,
    attacker.name,
    `(${Math.round(damage)} DMG)`
  );

  return getRandomRange(damage / 2, damage * 2);
}
