import { StatKey, EquipmentSlot } from "@/enums";

export type Equipment = {
  label: string;
  description: string;
  gold: number;
  isUnlocked: boolean;
  isEquipped: boolean;
  slot: EquipmentSlot;
  bonuses: {
    stat: StatKey;
    operator: string;
    value: number;
  }[];
};
