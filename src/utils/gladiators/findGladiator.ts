import type { Gladiator } from "@/types";

export default function findGladiator(gladiators: Gladiator[], id: string) {
  return gladiators.find((gladiator) => gladiator.id === id);
}
