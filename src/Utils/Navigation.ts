import Handlebars from "handlebars";
import { PAGES } from "../Consts/Pages";
import { EPages } from "../Enums";

const navigate = (page: EPages) => {
  const [src, args] = PAGES[page];
  const handlebarsFunc = Handlebars.compile(src);
  const appNode = document.getElementById("app");

  if (appNode) {
    appNode.innerHTML = handlebarsFunc(args);
  }
};

export function navigateInitial() {
  const path = window.location.pathname;

  switch (path) {
    case "/signin": {
      navigate(EPages.SIGN_IN);
      break;
    }
    case "/signup": {
      navigate(EPages.SIGN_UP);
      break;
    }
    case "/notfound": {
      navigate(EPages.NOT_FOUND);
      break;
    }
    case "/servererror": {
      navigate(EPages.SERVER_ERROR);
      break;
    }
    case "/messenger": {
      navigate(EPages.MAIN);
      break;
    }
    case "/profile": {
      navigate(EPages.PROFILE);
      break;
    }
    case "/editprofile": {
      navigate(EPages.EDIT_PROFILE);
      break;
    }
    case "/editpassword": {
      navigate(EPages.EDIT_PASSWORD);
      break;
    }

    default: {
      window.location.pathname = "/signin";
    }
  }
}
