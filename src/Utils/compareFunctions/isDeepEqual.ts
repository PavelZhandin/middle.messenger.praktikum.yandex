import { isEqual } from "./isEqual";
import { isObject } from "./isObject";

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
        const value1 = object1[key];
        const value2 = object2[key];
        const bothAreObjects = isObject(value1) && isObject(value2);

        if (
            (bothAreObjects &&
                !isDeepEqual(
                    value1 as Record<string, unknown>,
                    value2 as Record<string, unknown>,
                )) ||
            (!bothAreObjects && value1 !== value2)
        ) {
            return false;
        }

        if (!isEqual(object1[key], object2[key])) {
            return false;
        }
    }

    return true;
}
