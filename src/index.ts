import Handlebars from "handlebars";
import { registerComponent } from "./Utils/registerComponent";
import * as Components from "./Components";
import { navigateInitial } from "./Utils/Navigation";

const allComponents = {
    Input: Components.Input,
    BaseButton: Components.BaseButton,
    ChatList: Components.ChatList,
    ChatItem: Components.ChatItem,
    MessageList: Components.MessageList,
    Message: Components.Message,
};

Object.entries(allComponents).forEach(([name, component]) => {
    registerComponent(name, component);
});

Handlebars.registerHelper("safeVal", (value, safeValue) => {
    const out = value || safeValue;

    return new Handlebars.SafeString(out);
});

document.addEventListener("DOMContentLoaded", navigateInitial);
