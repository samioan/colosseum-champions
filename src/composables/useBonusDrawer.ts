import { ref, computed, type Ref } from "vue";
import { BonusStatus, Label } from "@/enums";

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

export function useBonusDrawer(
  points: Ref<number>,
  items: Ref<Ability[]> | Ref<Perk[]>,
  labels: Record<Label, string>
) {
  const isModalVisible = ref(false);
  const selectedIndex = ref<number>(0);

  const selectedItem = computed<Ability | Perk | undefined>(
    () => items.value[selectedIndex.value]
  );

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

  const itemStatus = computed(() => {
    const a = selectedItem.value;
    if (!a) return "";

    return itemLabels.text[a.status];
  });

  const iconProps = computed(() =>
    items.value.map((item, index) => ({
      isActive: item.status === BonusStatus.ACTIVE,
      isEquipped: item.status === BonusStatus.EQUIPPED,
      image: item.image,
      overlayText: itemLabels.overlay[item.status],
      onSelect: () => {
        isModalVisible.value = true;
        selectedIndex.value = index;
      },
    }))
  );

  const modalProps = computed(() => {
    const item = selectedItem.value;
    if (!item) return {};

    const notEnoughPoints =
      item.status === BonusStatus.LOCKED && item.points > points.value;
    const maxEquipped =
      item.status === BonusStatus.UNEQUIPPED &&
      items.value.filter((item) => item.status === BonusStatus.EQUIPPED)
        .length === 3;

    const warningMessage = (() => {
      if (notEnoughPoints) return "Not enough points!";
      else if (maxEquipped) return "Maximum abilities equipped!";
    })();

    const buttons = [
      {
        label: itemLabels.button[item.status],
        disabled: notEnoughPoints || maxEquipped,
        onClick: item.onSelect,
      },
    ];

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
  });

  return {
    isModalVisible,
    selectedIndex,
    selectedItem,
    itemStatus,
    iconProps,
    modalProps,
  };
}
