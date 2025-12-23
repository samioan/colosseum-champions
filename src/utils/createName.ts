import { NAMES } from "@/constants";

export default function createName() {
  return `${NAMES[Math.floor(Math.random() * NAMES.length)]}`;
}
