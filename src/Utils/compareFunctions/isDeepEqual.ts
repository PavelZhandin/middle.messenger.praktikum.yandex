import { isEqual } from "./isEqual";

export function isDeepEqual(
  object1: Record<string, unknown>,
  object2: Record<string, unknown>,
): boolean {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  // eslint-disable-next-line no-restricted-syntax
  for (const key of keys1) {
    if (!isEqual(object1[key], object2[key])) {
      return false;
    }
  }

  return true;
}
