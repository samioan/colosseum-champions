import { BonusStatus, EquipmentSlot } from "@/enums";
import type { Bonus } from "@/types";

export type Equipment = {
  label: string;
  image: string;
  description: string;
  gold: number;
  status: BonusStatus;
  slot: EquipmentSlot;
  bonuses: Bonus[];
};
