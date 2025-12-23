import { BonusStatus, EquipmentSlot } from "@/enums";

export type Equipment = {
  label: string;
  image: string;
  description: string;
  gold: number;
  status: BonusStatus;
  slot: EquipmentSlot;
  attack?: number[];
  armor?: number;
};
