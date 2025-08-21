import { StatKey, EquipmentId, EquipmentSlot, Operator } from "@/enums";
import type { Equipment } from "@/types";
import { shortSword, longSword } from "@/assets";

export const EQUIPMENT: Record<EquipmentId, Equipment> = {
  [EquipmentId.SHORT_SWORD]: {
    label: "Short Sword",
    image: shortSword,
    description: "STR + 10",
    gold: 5,
    isEquipped: false,
    isUnlocked: false,
    slot: EquipmentSlot.WEAPON,
    bonuses: [
      {
        stat: StatKey.MAX_STRENGTH,
        operator: Operator.ADDITION,
        value: 10,
      },
    ],
  },
  [EquipmentId.LONG_SWORD]: {
    label: "Long Sword",
    image: longSword,
    description: "STR + 20",
    gold: 10,
    isEquipped: false,
    isUnlocked: false,
    slot: EquipmentSlot.WEAPON,
    bonuses: [
      {
        stat: StatKey.MAX_STRENGTH,
        operator: Operator.ADDITION,
        value: 20,
      },
    ],
  },
  [EquipmentId.SMALL_SHIELD]: {
    label: "Small Shield",
    image: "",
    description: "DEF + 10",
    gold: 15,
    isEquipped: false,
    isUnlocked: false,
    slot: EquipmentSlot.SHIELD,
    bonuses: [
      {
        stat: StatKey.MAX_DEFENSE,
        operator: Operator.ADDITION,
        value: 10,
      },
    ],
  },
  [EquipmentId.LARGE_SHIELD]: {
    label: "Large Shield",
    image: "",
    description: "DEF + 20",
    gold: 20,
    isEquipped: false,
    isUnlocked: false,
    slot: EquipmentSlot.SHIELD,
    bonuses: [
      {
        stat: StatKey.MAX_DEFENSE,
        operator: Operator.ADDITION,
        value: 20,
      },
    ],
  },
  [EquipmentId.LIGHT_MAIL]: {
    label: "Light Mail",
    image: "",
    description: "DEF + 10",
    gold: 25,
    isEquipped: false,
    isUnlocked: false,
    slot: EquipmentSlot.CHEST,
    bonuses: [
      {
        stat: StatKey.MAX_DEFENSE,
        operator: Operator.ADDITION,
        value: 10,
      },
    ],
  },
  [EquipmentId.LIGHT_GLOVES]: {
    label: "Light Gloves",
    image: "",
    description: "DEF + 10",
    gold: 30,
    isEquipped: false,
    isUnlocked: false,
    slot: EquipmentSlot.GLOVES,
    bonuses: [
      {
        stat: StatKey.MAX_DEFENSE,
        operator: Operator.ADDITION,
        value: 10,
      },
    ],
  },
  [EquipmentId.LIGHT_BOOTS]: {
    label: "Light Boots",
    image: "",
    description: "DEF + 10",
    gold: 35,
    isEquipped: false,
    isUnlocked: false,
    slot: EquipmentSlot.BOOTS,
    bonuses: [
      {
        stat: StatKey.MAX_DEFENSE,
        operator: Operator.ADDITION,
        value: 10,
      },
    ],
  },
  [EquipmentId.LIGHT_HELMET]: {
    label: "Light Helmet",
    image: "",
    description: "DEF + 10",
    gold: 40,
    isEquipped: false,
    isUnlocked: false,
    slot: EquipmentSlot.HELMET,
    bonuses: [
      {
        stat: StatKey.MAX_DEFENSE,
        operator: Operator.ADDITION,
        value: 10,
      },
    ],
  },
  [EquipmentId.HEAVY_MAIL]: {
    label: "Heavy Mail",
    image: "",
    description: "DEF + 20",
    gold: 45,
    isEquipped: false,
    isUnlocked: false,
    slot: EquipmentSlot.CHEST,
    bonuses: [
      {
        stat: StatKey.MAX_DEFENSE,
        operator: Operator.ADDITION,
        value: 20,
      },
    ],
  },
  [EquipmentId.HEAVY_GLOVES]: {
    label: "Heavy Gloves",
    image: "",
    description: "DEF + 20",
    gold: 50,
    isEquipped: false,
    isUnlocked: false,
    slot: EquipmentSlot.GLOVES,
    bonuses: [
      {
        stat: StatKey.MAX_DEFENSE,
        operator: Operator.ADDITION,
        value: 20,
      },
    ],
  },
  [EquipmentId.HEAVY_BOOTS]: {
    label: "Heavy Boots",
    image: "",
    description: "DEF + 20",
    gold: 55,
    isEquipped: false,
    isUnlocked: false,
    slot: EquipmentSlot.BOOTS,
    bonuses: [
      {
        stat: StatKey.MAX_DEFENSE,
        operator: Operator.ADDITION,
        value: 20,
      },
    ],
  },
  [EquipmentId.HEAVY_HELMET]: {
    label: "Heavy Helmet",
    image: "",
    description: "DEF + 20",
    gold: 60,
    isEquipped: false,
    isUnlocked: false,
    slot: EquipmentSlot.HELMET,
    bonuses: [
      {
        stat: StatKey.MAX_DEFENSE,
        operator: Operator.ADDITION,
        value: 20,
      },
    ],
  },
};
