import Handlebars from "handlebars";
import { registerComponent } from "./Utils/registerComponent";
import * as Components from "./Components";
import * as Partials from "./Partials";
import { router, withRouting } from "./Utils/router/useRouter";
import { AuthAPI } from "./Core/Api/auth";
import { ERoutes } from "./Enums/routes";
import { Store } from "./Core/Store";
import { TAppState } from "./Models/appState";
import { STORE_INITIAL_STATE } from "./Core/Store/consts";

const allComponents = {
    Input: Components.Input,
    InputError: Components.InputError,
    InputValidated: Components.InputValidated,
    ErrorLine: Components.ErrorLine,
    BaseButton: Components.BaseButton,
    ChatList: Components.ChatList,
    ChatItem: Components.ChatItem,
    MessageList: Components.MessageList,
    Message: Components.Message,
    ChatHeader: Components.ChatHeader,
    ProfileAvatar: Components.ProfileAvatar,
};

const allPartials = {
    AuthFormContainer: Partials.AuthFormContainer,
    MainContainer: Partials.MainContainer,
    FormHeader: Partials.FormHeader,
    Link: Partials.Link,
    ProfileProperty: Partials.ProfileProperty,
};

Object.entries(allComponents).forEach(([name, component]) => {
    registerComponent(name, component);
});

Object.entries(allPartials).forEach(([name, partial]) => {
    Handlebars.registerPartial(name, partial());
});

Handlebars.registerHelper("safeVal", (value, safeValue) => {
    const out = value || safeValue;

    return new Handlebars.SafeString(out);
});

const authAPI = new AuthAPI();
window.store = new Store<TAppState>(STORE_INITIAL_STATE);

try {
    const currentRoute = window.location.pathname;
    const me = (await authAPI.getUser()) as any;
    if (currentRoute === ERoutes.SignUp) {
        router.go(ERoutes.SignUp);
    } else if (me.reason) {
        router.go(ERoutes.Home);
    }
    window.store.set({ user: me });
} catch (error) {
    router.go(ERoutes.Home);
}

withRouting();

// document.addEventListener("DOMContentLoaded", withRouting);
