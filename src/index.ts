import Handlebars from "handlebars";
import { registerComponent } from "./Utils/registerComponent";
import * as Components from "./Components";
import * as Partials from "./Partials";
import { withRouting } from "./Utils/router/useRouter";

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
};

const allPartials = {
    AuthFormContainer: Partials.AuthFormContainer,
    MainContainer: Partials.MainContainer,
    FormHeader: Partials.FormHeader,
    Link: Partials.Link,
    ProfileProperty: Partials.ProfileProperty,
    ProfileAvatar: Partials.ProfileAvatar,
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

document.addEventListener("DOMContentLoaded", withRouting);
