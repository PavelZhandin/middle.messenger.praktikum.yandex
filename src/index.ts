import './style.css'
import Handlebars from "handlebars";
import { RegistrationPage } from './Pages/signUpPage';

const pages = {
    'registrationPage': [ RegistrationPage ],
};

const navigate = (page) => {
    const [ src, args ] = pages[page];
    console.log(src)
    console.log(args)
    const handlebarsFunc = Handlebars.compile(src);
    document.getElementById('app').innerHTML = handlebarsFunc(args);
}

document.addEventListener('DOMContentLoaded', () => {
  const path = window.location.pathname;

  switch (path) {
    case '/register': {
      navigate('registrationPage');
      break;
    }
  }
});
