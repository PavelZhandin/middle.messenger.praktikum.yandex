export function isPrimitive(value: unknown) {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return true;
  }

  return typeof value !== "object" && typeof value !== "function";
}
