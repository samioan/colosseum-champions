import { StatKey, ItemId, Operator } from "@/enums";
import type { Item } from "@/types";
import { healthPotion } from "@/assets";

export const ITEMS: Record<ItemId, Item> = {
  [ItemId.HEALTH_POTION]: {
    label: "Health Potion",
    image: healthPotion,
    description: "Heals 25% of Max HP",
    gold: 10,
    amount: 0,
    bonuses: [
      {
        stat: StatKey.HEALTH,
        operator: Operator.ADDITION,
        value: {
          stat: StatKey.MAX_HEALTH,
          operator: Operator.MULTIPLICATION,
          modifier: 0.25,
        },
      },
    ],
  },
  [ItemId.STAMINA_POTION]: {
    label: "Stamina Potion",
    image: "",
    description: "Heals 25% of Max SP",
    gold: 10,
    amount: 0,
    bonuses: [
      {
        stat: StatKey.STAMINA,
        operator: Operator.ADDITION,
        value: {
          stat: StatKey.MAX_STAMINA,
          operator: Operator.MULTIPLICATION,
          modifier: 0.25,
        },
      },
    ],
  },
  [ItemId.SUPER_POTION]: {
    label: "Super Potion",
    image: "",
    description: "Heals 10% of Max SP and Max HP",
    gold: 10,
    amount: 0,
    bonuses: [
      {
        stat: StatKey.HEALTH,
        operator: Operator.ADDITION,
        value: {
          stat: StatKey.MAX_HEALTH,
          operator: Operator.MULTIPLICATION,
          modifier: 0.1,
        },
      },
      {
        stat: StatKey.STAMINA,
        operator: Operator.ADDITION,
        value: {
          stat: StatKey.MAX_STAMINA,
          operator: Operator.MULTIPLICATION,
          modifier: 0.1,
        },
      },
    ],
  },
};
