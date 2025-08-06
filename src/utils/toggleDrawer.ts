import { DrawerState } from "@/enums";
import type { Drawer } from "@/types";

export default function toggleDrawer(
  drawer: Drawer,
  state: DrawerState,
  title: string
) {
  drawer.isOpen = !drawer.isOpen;
  drawer.state = state;
  drawer.title = title;
}
