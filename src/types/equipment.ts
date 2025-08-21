import { EquipmentSlot } from "@/enums";
import type { Bonus } from "@/types";

export type Equipment = {
  label: string;
  image: string;
  description: string;
  gold: number;
  isUnlocked: boolean;
  isEquipped: boolean;
  slot: EquipmentSlot;
  bonuses: Bonus[];
};
