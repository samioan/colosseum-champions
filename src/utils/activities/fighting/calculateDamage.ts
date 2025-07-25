import type { Enemy, Gladiator } from "@/types";
import { createMessage } from "@/utils";
import { DAMAGE_MESSAGES, CRITICAL_MESSAGES } from "@/constants";

export default function calculateDamage(
  attacker: Enemy | Gladiator,
  defender: Gladiator | Enemy
) {
  let damage = attacker.strength * (100 / (100 + defender.defense));

  const critChance = attacker.dexterity / (attacker.dexterity + 200);
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

  return Math.round(damage);
}
