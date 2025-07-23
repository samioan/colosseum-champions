import type { Gladiator } from "@/types";
import type { Ref } from "vue";

export default function removeGladiator(
  gladiators: Ref<Gladiator[]>,
  selectedGladiator: Gladiator
) {
  const filteredArray = gladiators.value.filter(
    (gladiator) => gladiator.id !== selectedGladiator.id
  );

  gladiators.value = filteredArray;
}
