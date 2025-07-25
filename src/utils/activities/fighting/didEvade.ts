import type { Gladiator } from "@/types";

export default function didEvade(gladiator: Gladiator) {
  const evadeChance = gladiator.dexterity / (gladiator.dexterity + 100);
  return Math.random() < evadeChance;
}
