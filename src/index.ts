import Handlebars from "handlebars";
import * as Components from './Components';
import { navigateInitial, navigateOnClick } from './Utils/Navigation';

Object.entries(Components).forEach(([ name, component ]) => {
    Handlebars.registerPartial(name, component);
});

document.addEventListener('DOMContentLoaded', navigateInitial);

document.addEventListener('click',navigateOnClick);
