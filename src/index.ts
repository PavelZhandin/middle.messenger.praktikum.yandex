import Handlebars from "handlebars";
import { registerComponent } from "Utils/registerComponent";
import * as Components from "./Components";
import { navigateInitial } from "./Utils/Navigation";

// // Object.entries(Components).forEach(([name, component]) => {
// Object.entries(Components).forEach(([name, component: typeof Block]) => {
//     Handlebars.registerPartial(name, component);
// });

Object.entries(Components.ChatList).forEach(([name, component]) => {
    registerComponent(name, component);
});

Handlebars.registerHelper("safeVal", (value, safeValue) => {
    const out = value || safeValue;

    return new Handlebars.SafeString(out);
});

document.addEventListener("DOMContentLoaded", navigateInitial);
