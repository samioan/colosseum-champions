import type { Ability, GladiatorStats, Gladiator } from "@/types";
import { handleStat, calculateDamage, getRandomRange } from "@/utils";
import { StatKey, StatAction, AbilityId, BonusStatus } from "@/enums";

export default function performAbility(
  ability: Ability,
  attacker: Gladiator,
  defender: Gladiator,
  attackerUpdatedStats: GladiatorStats,
  defenderUpdatedStats: GladiatorStats
) {
  handleStat(
    attacker.stats,
    StatKey.STAMINA,
    ability.energy,
    StatAction.DECREASE,
    attackerUpdatedStats
  );

  switch (ability.id) {
    case AbilityId.TRIPLE_REND:
      handleStat(
        defender.stats,
        StatKey.HEALTH,
        calculateDamage(attacker, defender, AbilityId.TRIPLE_REND),
        StatAction.DECREASE,
        defenderUpdatedStats
      );
      break;
    case AbilityId.PIERCING_THRUST:
      handleStat(
        defender.stats,
        StatKey.HEALTH,
        calculateDamage(attacker, defender, AbilityId.PIERCING_THRUST),
        StatAction.DECREASE,
        defenderUpdatedStats
      );
      break;
    case AbilityId.REAPERS_EDGE:
      handleStat(
        defender.stats,
        StatKey.HEALTH,
        attackerUpdatedStats.maxHealth - attacker.stats.health,
        StatAction.DECREASE,
        defenderUpdatedStats
      );
      break;
    case AbilityId.MEND_WOUNDS:
      handleStat(
        attacker.stats,
        StatKey.HEALTH,
        getRandomRange(
          attackerUpdatedStats.maxHealth / 4,
          attackerUpdatedStats.maxHealth / 2
        ),
        StatAction.INCREASE,
        attackerUpdatedStats
      );
      break;
    case AbilityId.POWER_SURGE:
      handleStat(
        attacker.stats,
        StatKey.STRENGTH,
        getRandomRange(
          attackerUpdatedStats.maxStrength / 4,
          attackerUpdatedStats.maxStrength / 2
        ),
        StatAction.INCREASE,
        attackerUpdatedStats
      );
      break;
    case AbilityId.GUARDIANS_BOON:
      handleStat(
        attacker.stats,
        StatKey.DEFENSE,
        getRandomRange(
          attackerUpdatedStats.maxDefense / 4,
          attackerUpdatedStats.maxDefense / 2
        ),
        StatAction.INCREASE,
        attackerUpdatedStats
      );
      break;
    case AbilityId.DRAIN_ENERGY:
      handleStat(
        defender.stats,
        StatKey.STAMINA,
        getRandomRange(
          defenderUpdatedStats.maxStamina / 4,
          defenderUpdatedStats.maxStamina / 2
        ),
        StatAction.DECREASE,
        defenderUpdatedStats
      );
      break;
    case AbilityId.WEAKEN_RESOLVE:
      handleStat(
        defender.stats,
        StatKey.STRENGTH,
        getRandomRange(
          defenderUpdatedStats.maxStrength / 4,
          defenderUpdatedStats.maxStrength / 2
        ),
        StatAction.DECREASE,
        defenderUpdatedStats
      );
      break;
    case AbilityId.CRUSH_ARMOR:
      handleStat(
        defender.stats,
        StatKey.DEFENSE,
        getRandomRange(
          defenderUpdatedStats.maxDefense / 4,
          defenderUpdatedStats.maxDefense / 2
        ),
        StatAction.DECREASE,
        defenderUpdatedStats
      );
      break;
    case AbilityId.PILLAGE:
      const defenderEquipment = Object.values(defender.equipment).filter(
        (equip) => equip.status === BonusStatus.EQUIPPED
      );

      if (defenderEquipment.length) {
        const randomIndex = Math.floor(
          Math.random() * defenderEquipment.length
        );
        const randomItem = defenderEquipment[randomIndex];

        randomItem.status = BonusStatus.UNEQUIPPED;
      }
      break;
    case AbilityId.NULLIFY:
      const defenderPerks = Object.values(defender.perks).filter(
        (perk) => perk.status === BonusStatus.EQUIPPED
      );

      if (defenderPerks.length) {
        const randomIndex = Math.floor(Math.random() * defenderPerks.length);
        const randomItem = defenderPerks[randomIndex];

        randomItem.status = BonusStatus.UNEQUIPPED;
      }
      break;
    case AbilityId.NULLIFY:
      const defenderAbilities = Object.values(defender.abilities).filter(
        (ability) =>
          ability.status === BonusStatus.EQUIPPED ||
          ability.status === BonusStatus.ACTIVE
      );

      if (defenderAbilities.length) {
        const randomIndex = Math.floor(
          Math.random() * defenderAbilities.length
        );
        const randomItem = defenderAbilities[randomIndex];

        randomItem.status = BonusStatus.UNEQUIPPED;
      }
      break;
    default:
      break;
  }

  ability.cooldown = 0;
}
