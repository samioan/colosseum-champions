import { StatKey } from "@/enums";
import type { Gladiator, GladiatorStats } from "@/types";

export default function calculatePerks(
  gladiator: Gladiator,
  gladiatorStats: GladiatorStats
): GladiatorStats {
  const selectedPerks = gladiator.perks.filter((perk) => perk.isSelected);
  const bonuses = selectedPerks.map(({ bonuses }) => bonuses).flat();
  const calcBonuses = bonuses.map((bonus) => {
    function calculateValue() {
      const isActive = !bonus.requirements?.length
        ? true
        : bonus.requirements?.every((requirement) => {
            const maxStat = `max${requirement.stat[0].toUpperCase()}${requirement.stat.slice(
              1
            )}`;

            switch (requirement.operator) {
              case "<":
                return (
                  gladiatorStats[requirement.stat] <
                  gladiatorStats[maxStat as StatKey] * requirement.value
                );
              case ">":
                return (
                  gladiatorStats[requirement.stat] >
                  gladiatorStats[maxStat as StatKey] * requirement.value
                );
              case "=":
                return (
                  gladiatorStats[requirement.stat] ===
                  gladiatorStats[maxStat as StatKey] * requirement.value
                );
              default:
                return false;
            }
          });

      if (isActive) {
        switch (bonus.operator) {
          case "+":
            return bonus.value;
          case "*":
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

  const groupedBonuses: any = calcBonuses.reduce((groups, item) => {
    let bonusStat = groups[item.stat] || 0;
    bonusStat += item.value;
    groups[item.stat] = bonusStat;
    return groups;
  }, {} as any);

  return groupedBonuses;
}
