import { PAGES } from '../src/Consts/Pages';
import Handlebars from "handlebars";

const navigate = (page) => {
    console.log(page)
    const [ src, args ] = PAGES[page];
    const handlebarsFunc = Handlebars.compile(src);
    
    document.getElementById('app').innerHTML = handlebarsFunc(args);
}

export function navigateInitial () {
    const path = window.location.pathname;

    switch (path) {
        case '/signin': {
            navigate('SignInPage');
            break;
        }
        case '/signup': {
            navigate('SignUpPage');
            break;
        }
        case '/notfound': {
            navigate('NotFoundPage');
            break;
        }
        case '/servererror': {
            navigate('ServerErrorPage');
            break;
        }
        case '/messenger': {
            navigate('MainPage');
            break;
        }
        
        default: {
            window.location.pathname = '/messenger'
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