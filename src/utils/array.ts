export function getNextItem<T>(array: T[], item: T) {
  return array[array.indexOf(item) + 1];
}

export function getPreviousItem<T>(array: T[], item: T) {
  return array[array.indexOf(item) - 1];
}

export function contains<T>(array: T[] | undefined, item: T): boolean {
  return !!array && array.indexOf(item) >= 0;
}

export function last<T>(array: T[]) {
  return array[array.length - 1];
}

export function isLast<T>(array: T[], item: T) {
  return array.indexOf(item) == array.length - 1;
}

export function isFirst<T>(array: T[], item: T) {
  return array.indexOf(item) == 0;
}
