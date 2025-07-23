import type { Gladiator } from "@/types";
import { removeGladiator } from "@/utils";
import type { Ref } from "vue";

export default function selectGladiator(
  gladiators: Ref<Gladiator[]>,
  selectedGladiators: Gladiator[],
  selectedGladiator: Gladiator
) {
  removeGladiator(gladiators, selectedGladiator);
  selectedGladiators.push(selectedGladiator);
}
