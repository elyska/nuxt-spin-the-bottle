import type { Position, UseSwipeDirection } from "@vueuse/core";

export function normaliseCursorPosition(coord: number, windowSize: number) {
  return (coord / windowSize - 0.5) * 2;
}

export function normaliseAngle(rad: number) {
  return ((rad % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
}

export function getAngleDirection(
  cursor: Position,
  swipeDirection: UseSwipeDirection
) {
  switch (swipeDirection) {
    case "left":
      return cursor.y > 0 ? -1 : 1;
    case "right":
      return cursor.y > 0 ? 1 : -1;
    case "up":
      return cursor.x > 0 ? 1 : -1;
    case "down":
      return cursor.x > 0 ? -1 : 1;
    default:
      return 1;
  }
}
