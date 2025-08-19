import { EquipmentId, PerkId, Operator, StatKey } from "@/enums";
import type {
  Gladiator,
  GladiatorStats,
  Equipment,
  Perk,
  Bonus,
} from "@/types";

export default function calculateBonuses(
  gladiator: Gladiator,
  gladiatorStats: GladiatorStats,
  items: Record<PerkId, Perk> | Record<EquipmentId, Equipment>
): GladiatorStats {
  const equippedItems = Object.values(items).filter((item) => item.isEquipped);
  const bonuses = equippedItems.map(({ bonuses }) => bonuses).flat();
  const calcBonuses = bonuses.map((bonus: Bonus) => {
    function calculateValue() {
      const isActive = !bonus.requirements?.length
        ? true
        : bonus.requirements?.every((requirement) => {
            const maxStat =
              `max${requirement.stat[0].toUpperCase()}${requirement.stat.slice(
                1
              )}` as StatKey;

            switch (requirement.operator) {
              case Operator.LESS_THAN:
                return (
                  gladiatorStats[requirement.stat] <
                  gladiatorStats[maxStat] * requirement.value
                );
              case Operator.GREATER_THAN:
                return (
                  gladiatorStats[requirement.stat] >
                  gladiatorStats[maxStat] * requirement.value
                );
              case Operator.EQUALS:
                return (
                  gladiatorStats[requirement.stat] ===
                  gladiatorStats[maxStat] * requirement.value
                );
              default:
                return false;
            }
          });

      if (isActive) {
        switch (bonus.operator) {
          case Operator.ADDITION:
            return bonus.value;
          case Operator.MULTIPLICATION:
            return gladiator.stats[bonus.stat] * (bonus.value - 1);
          default:
            return 0;
        }
      } else return 0;
    }

    return {
      stat: bonus.stat,
      value: calculateValue(),
    };
  });

  const groupedBonuses: Record<StatKey, number> = calcBonuses.reduce(
    (groups, item) => {
      let bonusStat = groups[item.stat] || 0;
      bonusStat += item.value;
      groups[item.stat] = bonusStat;
      return groups;
    },
    {} as Record<StatKey, number>
  );

  return groupedBonuses;
}
