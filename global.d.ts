import { Router } from "./src/Utils/router";

declare global {
    interface Window {
        router: Router;
    }
    type Optional<T> = T | undefined;

    declare type Nullable<T> = T | null;
}
