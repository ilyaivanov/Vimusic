export function nextItem<T>(array: T[], item: T) {
  return array[array.indexOf(item) + 1];
}

export function previousItem<T>(array: T[], item: T) {
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

export function insertBefore<T>(array: T[], insertBofore: T, valueToInsert: T): T[] {
  const index = array.indexOf(insertBofore);
  const copy = [...array];
  copy.splice(index, 0, valueToInsert);
  return copy;
}

export function insertAfter<T>(array: T[], insertAfter: T, valueToInsert: T) {
  const index = array.indexOf(insertAfter);
  const copy = [...array];
  copy.splice(index + 1, 0, valueToInsert);
  return copy;
}


export function getPrevious<T>(array: T[], item: T) {
  const index = array.indexOf(item);
  return array[index - 1];
}

export function removeItem<T>(array: T[] | undefined, item: T) {
  if (!array)
    return [];
  array.splice(array.indexOf(item), 1);
}

export function swapLeft<T>(array: T[], item: T) {
  const index = array.indexOf(item);

  if (index == 0)
    return array;

  return [
    ...array.slice(0, index - 1),
    array[index],
    array[index - 1],
    ...array.slice(index + 1),
  ];
}

export function swapRight<T>(array: T[], item: T) {
  const index = array.indexOf(item);

  if (index == array.length - 1)
    return array;

  return [
    ...array.slice(0, index),
    array[index + 1],
    array[index],
    ...array.slice(index + 2),
  ];
}

