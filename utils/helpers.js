export function round(number, power) {
  const rounded = avoidFloatError(Math.round(number * 10 ** -power) / 10 ** -power);
  return rounded;
}

export function avoidFloatError(number) {
  return Math.round(number * 10 ** 10) / 10 ** 10;
}

export function normaliseCursorPosition(coord, windowSize) {
  return (coord / windowSize - 0.5) * 2;
}

export function normaliseAngle(rad) {
  return (rad % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2);
}

export function getAngleDirection(cursor, swipeDirection) {
  switch (swipeDirection) {
    case 'left':
      return cursor.y > 0 ? -1 : 1;
    case 'right':
      return cursor.y > 0 ? 1 : -1;
    case 'up':
      return cursor.x > 0 ? 1 : -1;
    case 'down':
      return cursor.x > 0 ? -1 : 1;
    default:
      return 1;
  }
}

export function getCirclePoses(radius, count) {
  const angleIncrement = (Math.PI * 2) / count;
  let poses = [];
  for (let i = 0; i < count; i++) {
    const rotation = angleIncrement * i;
    const x = round(radius * Math.cos(rotation), -5);
    const y = round(radius * Math.sin(rotation), -5);
    poses.push({ x: x, y: y, rotation: rotation }); // in 2D, x and y don't match 3D world
  }

  return poses;
}
