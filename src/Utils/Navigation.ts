import { PAGES } from "../Consts/Pages";
import { EPages } from "../Enums";
import { TBlock } from "../Core/Block";

const navigate = (page: EPages) => {
    const appNode = document.getElementById("app");
    const Component = PAGES[page] as unknown as TBlock;
    const component = new Component({events:{}});
    const htmlElement = component.getContent();

    if (appNode && htmlElement) {
        appNode.appendChild(htmlElement);
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
