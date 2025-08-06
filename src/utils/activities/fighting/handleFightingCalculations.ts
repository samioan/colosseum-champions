import type { Gladiator } from "@/types";
import {
  handleStat,
  didEvade,
  calculateDamage,
  createMessage,
  performAbility,
} from "@/utils";
import { StatAction, StatKey } from "@/enums";

import { DODGE_MESSAGES } from "@/constants";

export default function handleFightingCalculations(
  gladiator: Gladiator,
  enemy: Gladiator
) {
  const curAttacker = gladiator.hasTurn ? gladiator : enemy;
  const curDefender = gladiator.hasTurn ? enemy : gladiator;

  const ability = curAttacker?.abilities?.find((ability) => ability.isActive);

  if (ability && curAttacker.stats.rage >= ability.rage) {
    performAbility(ability, curAttacker, curDefender);
    createMessage(
      curAttacker.messages,
      [`uses ${ability.label}!`],
      curAttacker.id,
      curAttacker.name
    );
  } else {
    const damage = didEvade(curDefender)
      ? 0
      : calculateDamage(curAttacker, curDefender);

    if (!damage) {
      createMessage(
        curAttacker.messages,
        DODGE_MESSAGES,
        curAttacker.id,
        curAttacker.name
      );
    }

    handleStat(curAttacker, StatKey.STAMINA, 5, StatAction.DECREASE);
    handleStat(curAttacker, StatKey.RAGE, 5, StatAction.INCREASE);
    handleStat(curDefender, StatKey.HEALTH, damage, StatAction.DECREASE);
  }

  curAttacker.hasTurn = false;
  curDefender.hasTurn = true;
}
