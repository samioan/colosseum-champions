<script setup lang="ts">
import { EQUIPMENT_LABELS } from "@/constants";
import { BonusStatus, EquipmentSlot, Label } from "@/enums";
import { computed, ref } from "vue";
import { DrawerIcon, DrawerModal, Accordion } from "@/components";

type Equip = {
  image: string;
  label: string;
  description: string;
  gold: number;
  slot: EquipmentSlot;
  status: BonusStatus;
  onSelect: () => void;
  onActivate: () => void;
};

const props = defineProps<{
  gold: number;
  equipment: Equip[];
  labels: Record<Label, string>;
}>();

const isModalVisible = ref(false);
const selectedIndex = ref<number>(0);
const selectedSlot = ref<EquipmentSlot>(EquipmentSlot.BOOTS);

const equipmentCategories = computed(() => {
  return props.equipment.reduce((acc, item) => {
    if (!acc[item.slot]) acc[item.slot] = [];
    acc[item.slot].push(item);
    return acc;
  }, {} as Record<EquipmentSlot, Equip[]>);
});

const selectedEquip = computed<Equip | null>(() => {
  const items = equipmentCategories.value[selectedSlot.value] ?? [];
  return items[selectedIndex.value] ?? null;
});

const equipStatus = computed(() => {
  const e = selectedEquip.value;
  if (!e) return "";
  return {
    [BonusStatus.LOCKED]: props.labels.LOCKED,
    [BonusStatus.UNEQUIPPED]: props.labels.UNEQUIPPED,
    [BonusStatus.EQUIPPED]: props.labels.EQUIPPED,
    [BonusStatus.ACTIVE]: props.labels.ACTIVE,
  }[e.status];
});

const categoryProps = computed(() => {
  return Object.entries(equipmentCategories.value).map(([slot, items]) => {
    return {
      slot: slot as EquipmentSlot,
      label: EQUIPMENT_LABELS[slot as EquipmentSlot],
      icons: items.map((equip, index) => ({
        image: equip.image,
        isActive: equip.status === BonusStatus.EQUIPPED,
        isEquipped: equip.status === BonusStatus.UNEQUIPPED,
        overlayText: (() => {
          return {
            [BonusStatus.LOCKED]: props.labels.LCK,
            [BonusStatus.UNEQUIPPED]: props.labels.UNEQ,
            [BonusStatus.EQUIPPED]: props.labels.EQP,
            [BonusStatus.ACTIVE]: props.labels.ACT,
          }[equip.status];
        })(),
        onSelect: () => {
          isModalVisible.value = true;
          selectedSlot.value = equip.slot;
          selectedIndex.value = index;
        },
      })),
    };
  });
});

const modalProps = computed(() => {
  const e = selectedEquip.value;
  if (!e) return {};

  const hasNotEnoughGold =
    props.gold < e.gold && e.status === BonusStatus.LOCKED;
  const equipLabel = {
    [BonusStatus.LOCKED]: props.labels.UNLOCK,
    [BonusStatus.UNEQUIPPED]: props.labels.EQUIP,
    [BonusStatus.EQUIPPED]: props.labels.UNEQUIP,
    [BonusStatus.ACTIVE]: props.labels.UNEQUIP,
  }[e.status];

  const warningMessage = (() => {
    if (hasNotEnoughGold) return "Not enough gold!";
  })();

  const buttons = [
    {
      label: equipLabel,
      disabled: hasNotEnoughGold,
      onClick: () =>
        e.status === BonusStatus.LOCKED ? e.onSelect() : e.onActivate(),
    },
  ];

  return {
    modelValue: isModalVisible.value,
    "onUpdate:modelValue": (val: boolean | undefined) => {
      isModalVisible.value = !!val;
    },
    onClose: () => {
      isModalVisible.value = false;
      selectedIndex.value = 0;
    },
    label: e.label,
    image: e.image,
    description: e.description,
    gold: e.gold,
    status: equipStatus.value,
    warningMessage,
    buttons,
  };
});
</script>

<template>
  <div class="flex flex-col justify-center gap-4">
    <Accordion v-for="category in categoryProps" :key="category.slot">
      <template #header>
        <div class="text-center">
          {{ category.label }}
        </div>
      </template>

      <template #content>
        <div class="flex flex-wrap justify-center gap-4">
          <DrawerIcon
            v-for="(props, index) in category.icons"
            :key="index"
            v-bind="props"
          />
        </div>
      </template>
    </Accordion>

    <DrawerModal v-bind="modalProps" />
  </div>
</template>
