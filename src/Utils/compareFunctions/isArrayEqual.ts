import { isEqual } from "./isEqual";

export function isArrayDeepEqual(array1: unknown[], array2: unknown[]) {
    if (array1.length !== array2.length) {
        return false;
    }

    array1.forEach((_, i) => {
        if (!isEqual(array1[i], array2[i])) {
            return false;
        }
    });

    return true;
}
