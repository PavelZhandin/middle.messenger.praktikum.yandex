import Handlebars from "handlebars";
import { registerComponent } from "./Utils/registerComponent";
import * as Components from "./Components";
import { navigateInitial } from "./Utils/Navigation";

const allComponents = {
    'ChatList': Components.ChatList,
    'ChatItem': Components.ChatItem,
}

Object.entries(allComponents).forEach(([name, component]) => {
    console.log(component)
    registerComponent(name, component);
});

Handlebars.registerHelper("safeVal", (value, safeValue) => {
    const out = value || safeValue;

    return new Handlebars.SafeString(out);
});

document.addEventListener("DOMContentLoaded", navigateInitial);
