import { StatKey } from "@/enums";
import type { Item } from "@/types";

export const ITEMS: Item[] = [
  {
    id: "health-potion",
    label: "Health Potion",
    description: "Heals 25% of Max HP",
    gold: 10,
    amount: 0,
    bonuses: [
      {
        stat: StatKey.HEALTH,
        operator: "+",
        value: {
          stat: StatKey.MAX_HEALTH,
          operator: "*",
          modifier: 0.25,
        },
      },
    ],
  },
  {
    id: "stamina-potion",
    label: "Stamina Potion",
    description: "Heals 25% of Max SP",
    gold: 10,
    amount: 0,
    bonuses: [
      {
        stat: StatKey.STAMINA,
        operator: "+",
        value: {
          stat: StatKey.MAX_STAMINA,
          operator: "*",
          modifier: 0.25,
        },
      },
    ],
  },
  {
    id: "super-potion",
    label: "Super Potion",
    description: "Heals 10% of Max SP and Max HP",
    gold: 10,
    amount: 0,
    bonuses: [
      {
        stat: StatKey.HEALTH,
        operator: "+",
        value: {
          stat: StatKey.MAX_HEALTH,
          operator: "*",
          modifier: 0.1,
        },
      },
      {
        stat: StatKey.STAMINA,
        operator: "+",
        value: {
          stat: StatKey.MAX_STAMINA,
          operator: "*",
          modifier: 0.1,
        },
      },
    ],
  },
];
