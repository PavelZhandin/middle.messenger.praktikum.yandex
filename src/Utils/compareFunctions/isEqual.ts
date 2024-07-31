import { isArrayDeepEqual } from "./isArrayEqual";
import { isPrimitive } from "./isPrimitive";

export function isEqual(value1: unknown, value2: unknown) {
    if (isPrimitive(value1) && isPrimitive(value2)) {
        return value1 === value2;
    }

    if (Array.isArray(value1) && Array.isArray(value2)) {
        return isArrayDeepEqual(value1, value2);
    }

    return false;
}
