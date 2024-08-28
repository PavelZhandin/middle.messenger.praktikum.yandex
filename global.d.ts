import { Store } from "./src/Core/Store";
import { TAppState } from "./src/Models/appState";
import { Router } from "./src/Utils/router";

declare global {
    interface Window {
        router: Router;
        store: Store<TAppState>;
    }

    type Optional<T> = T | undefined;

    declare type Nullable<T> = T | null;
}
