import Block from "../../Core/Block";
import pageTemplate from "./template.hbs?raw";

export class SignInPage extends Block {
    constructor() {
      super({ events: {} });
    }
  
    protected render(): string {
      return pageTemplate;
    }
  }
