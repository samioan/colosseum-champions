export default function getActivityExp(base: number, level: number) {
  return Math.floor(base * (1 + level * 0.1));
}
