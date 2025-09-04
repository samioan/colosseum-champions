import { ref, computed, type Ref } from "vue";
import { BonusStatus, Label, EquipmentSlot } from "@/enums";

type Ability = {
  label: string;
  description: string;
  image: string;
  stamina: number;
  points: number;
  status: BonusStatus;
  onSelect: () => void;
  onActivate: () => void;
};

type Perk = {
  image: string;
  label: string;
  description: string;
  status: BonusStatus;
  points: number;
  onSelect: () => void;
};

type ShopItem = {
  image: string;
  label: string;
  description: string;
  gold: number;
  onSelect: () => void;
  amount: number;
};

type Equipment = {
  image: string;
  label: string;
  description: string;
  gold: number;
  slot: EquipmentSlot;
  status: BonusStatus;
  onSelect: () => void;
  onActivate: () => void;
};

type Item = Ability | Perk | ShopItem | Equipment;

export function useBonusDrawer(
  pointsOrGold: Ref<number>,
  items: Ref<Item[]>,
  labels: Record<Label, string>,
  equipmentLabels?: Record<EquipmentSlot, string>
) {
  const isModalVisible = ref(false);
  const selectedIndex = ref<number>(0);
  const selectedSlot = ref<EquipmentSlot | null>(null);

  const selectedItem = computed<Item | undefined>(() => {
    if (selectedSlot.value) {
      const equipment = (items.value as Equipment[]).filter(
        (e) => e.slot === selectedSlot.value
      );
      return equipment[selectedIndex.value];
    }
    return items.value[selectedIndex.value];
  });

  const itemLabels = {
    text: {
      [BonusStatus.LOCKED]: labels.LOCKED,
      [BonusStatus.UNEQUIPPED]: labels.UNEQUIPPED,
      [BonusStatus.EQUIPPED]: labels.EQUIPPED,
      [BonusStatus.ACTIVE]: labels.ACTIVE,
    },
    overlay: {
      [BonusStatus.LOCKED]: labels.LCK,
      [BonusStatus.UNEQUIPPED]: labels.UNEQ,
      [BonusStatus.EQUIPPED]: labels.EQP,
      [BonusStatus.ACTIVE]: labels.ACT,
    },
    button: {
      [BonusStatus.LOCKED]: labels.UNLOCK,
      [BonusStatus.UNEQUIPPED]: labels.EQUIP,
      [BonusStatus.EQUIPPED]: labels.UNEQUIP,
      [BonusStatus.ACTIVE]: labels.UNEQUIP,
    },
    extra: {
      [BonusStatus.LOCKED]: labels.ACTIVATE,
      [BonusStatus.UNEQUIPPED]: labels.ACTIVATE,
      [BonusStatus.EQUIPPED]: labels.ACTIVATE,
      [BonusStatus.ACTIVE]: labels.DEACTIVATE,
    },
  };

  const equipmentCategories = computed<Record<EquipmentSlot, Equipment[]>>(
    () => {
      if (!items.value.length || !("slot" in items.value[0]))
        return {} as Record<EquipmentSlot, Equipment[]>;

      return (items.value as Equipment[]).reduce((acc, item) => {
        if (!acc[item.slot]) acc[item.slot] = [];
        acc[item.slot].push(item);
        return acc;
      }, {} as Record<EquipmentSlot, Equipment[]>);
    }
  );

  const categoryProps = computed(() => {
    if (!equipmentLabels) return [];
    return (
      Object.entries(equipmentCategories.value) as [
        EquipmentSlot,
        Equipment[]
      ][]
    ).map(([slot, eqItems]) => ({
      slot,
      label: equipmentLabels[slot],
      icons: eqItems.map((equip, index) => ({
        image: equip.image,
        isActive: equip.status === BonusStatus.EQUIPPED,
        isEquipped: equip.status === BonusStatus.UNEQUIPPED,
        overlayText: itemLabels.overlay[equip.status],
        onSelect: () => {
          isModalVisible.value = true;
          selectedSlot.value = equip.slot;
          selectedIndex.value = index;
        },
      })),
    }));
  });

  const itemStatus = computed(() => {
    const a = selectedItem.value;
    if (!a) return "";

    if ("status" in a) return itemLabels.text[a.status];
    if ("amount" in a) return `${labels.AVAILABLE}: ${a.amount}`;
    return "";
  });

  const iconProps = computed(() => {
    if ("slot" in (items.value[0] ?? {})) return [];
    return items.value.map((item, index) => {
      const base = {
        image: item.image,
        onSelect: () => {
          isModalVisible.value = true;
          selectedSlot.value = null;
          selectedIndex.value = index;
        },
      };

      if ("status" in item) {
        return {
          ...base,
          isActive: item.status === BonusStatus.ACTIVE,
          isEquipped: item.status === BonusStatus.EQUIPPED,
          overlayText: itemLabels.overlay[item.status],
        };
      }

      if ("amount" in item) {
        return {
          ...base,
          overlayText: `${item.amount}`,
        };
      }

      return base;
    });
  });

  const modalProps = computed(() => {
    const item = selectedItem.value;
    if (!item) return {};

    let warningMessage: string | undefined;
    const buttons: { label: string; disabled: boolean; onClick: () => void }[] =
      [];

    if ("status" in item && !("slot" in item)) {
      const notEnoughPoints =
        item.status === BonusStatus.LOCKED && item.points > pointsOrGold.value;
      const maxEquipped =
        item.status === BonusStatus.UNEQUIPPED &&
        items.value.filter(
          (it) =>
            "status" in it &&
            (it as Ability | Perk).status === BonusStatus.EQUIPPED
        ).length === 3;

      if (notEnoughPoints) warningMessage = labels.POINTS_ERROR;
      else if (maxEquipped) warningMessage = labels.MAX_ERROR;

      buttons.push({
        label: itemLabels.button[item.status],
        disabled: notEnoughPoints || maxEquipped,
        onClick: item.onSelect,
      });

      if ("onActivate" in item) {
        buttons.push({
          label: itemLabels.extra[item.status],
          disabled:
            item.status === BonusStatus.LOCKED ||
            item.status === BonusStatus.UNEQUIPPED,
          onClick: item.onActivate,
        });
      }

      return {
        modelValue: isModalVisible.value,
        "onUpdate:modelValue": (val: boolean | undefined) =>
          (isModalVisible.value = !!val),
        onClose: () => {
          isModalVisible.value = false;
          selectedIndex.value = 0;
        },
        label: item.label,
        image: item.image,
        description: item.description,
        stamina: "stamina" in item ? item.stamina : undefined,
        points: item.points,
        status: itemStatus.value,
        buttons,
        warningMessage,
      };
    }

    if ("amount" in item) {
      const notEnoughGold = pointsOrGold.value < item.gold;
      if (notEnoughGold) warningMessage = labels.GOLD_ERROR;

      buttons.push({
        label: labels.BUY,
        disabled: notEnoughGold,
        onClick: item.onSelect,
      });

      return {
        modelValue: isModalVisible.value,
        "onUpdate:modelValue": (val: boolean | undefined) =>
          (isModalVisible.value = !!val),
        onClose: () => {
          isModalVisible.value = false;
          selectedIndex.value = 0;
        },
        label: item.label,
        image: item.image,
        description: item.description,
        gold: item.gold,
        status: itemStatus.value,
        buttons,
        warningMessage,
      };
    }

    if ("slot" in item) {
      const notEnoughGold =
        pointsOrGold.value < item.gold && item.status === BonusStatus.LOCKED;
      if (notEnoughGold) warningMessage = labels.GOLD_ERROR;

      const equipLabel = itemLabels.button[item.status];

      buttons.push({
        label: equipLabel,
        disabled: notEnoughGold,
        onClick: () =>
          item.status === BonusStatus.LOCKED
            ? item.onSelect()
            : item.onActivate(),
      });

      return {
        modelValue: isModalVisible.value,
        "onUpdate:modelValue": (val: boolean | undefined) =>
          (isModalVisible.value = !!val),
        onClose: () => {
          isModalVisible.value = false;
          selectedIndex.value = 0;
        },
        label: item.label,
        image: item.image,
        description: item.description,
        gold: item.gold,
        status: itemStatus.value,
        buttons,
        warningMessage,
      };
    }

    return {};
  });

  return {
    isModalVisible,
    selectedIndex,
    selectedItem,
    itemStatus,
    iconProps,
    modalProps,
    categoryProps,
  };
}
