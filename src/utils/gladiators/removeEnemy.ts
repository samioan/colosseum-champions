import type { Enemy, Gladiator } from "@/types";
import type { Ref } from "vue";

export default function removeEnemy(
  enemies: Ref<Enemy[]>,
  gladiator: Gladiator
) {
  const filteredArray = enemies.value.filter(
    (enemy) => enemy.gladiatorId !== gladiator.id
  );

  enemies.value = filteredArray;
}
