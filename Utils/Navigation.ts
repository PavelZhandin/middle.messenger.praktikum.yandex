import { PAGES } from '../src/Consts/Pages';
import Handlebars from "handlebars";

const navigate = (page) => {
    const [ src, args ] = PAGES[page];
    const handlebarsFunc = Handlebars.compile(src);
    
    document.getElementById('app').innerHTML = handlebarsFunc(args);
}

export function navigateInitial () {
    const path = window.location.pathname;

    switch (path) {
        default : {
            navigate('SignUpPage');
        }
    }
}

export function navigateOnClick (e) {
    const page = e.target.getAttribute('page');
  
    if (page) {
        navigate(page);

        e.preventDefault();
        e.stopImmediatePropagation();
    }
}