import Handlebars from "handlebars";
import * as Components from './Components';
import { navigateInitial } from './Utils/Navigation';

Object.entries(Components).forEach(([ name, component ]) => {
    Handlebars.registerPartial(name, component);
});

document.addEventListener('DOMContentLoaded', navigateInitial);
