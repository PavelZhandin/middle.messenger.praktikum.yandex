import Handlebars from "handlebars";
import * as Components from "./Components";
import { navigateInitial } from "./Utils/Navigation";

Object.entries(Components).forEach(([name, component]) => {
    Handlebars.registerPartial(name, component);
});

Handlebars.registerHelper("safeVal", (value, safeValue) => {
    const out = value || safeValue;

    return new Handlebars.SafeString(out);
});

document.addEventListener("DOMContentLoaded", navigateInitial);
