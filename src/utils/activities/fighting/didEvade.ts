import type { Gladiator } from "@/types";

export default function didEvade(gladiator: Gladiator) {
  const evadeChance =
    gladiator.stats.dexterity / (gladiator.stats.dexterity + 100);
  return Math.random() < evadeChance;
}
