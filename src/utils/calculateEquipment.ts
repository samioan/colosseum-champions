import type { Gladiator, GladiatorStats } from "@/types";

export default function calculateEquipment(
  gladiator: Gladiator
): GladiatorStats {
  const equippedItems = Object.values(gladiator.equipment).filter(
    (item) => item.isEquipped
  );
  const bonuses = equippedItems.map(({ bonuses }) => bonuses).flat();
  const calcBonuses = bonuses.map((bonus) => {
    function calculateValue() {
      switch (bonus.operator) {
        case "+":
          return bonus.value;
        case "*":
          return gladiator.stats[bonus.stat] * (bonus.value - 1);
        default:
          return 0;
      }
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
