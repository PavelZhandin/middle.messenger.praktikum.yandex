import pageTemplate from "./template.hbs?raw";
import Block from "../../Core/Block";

export class RegisterPage extends Block {
  constructor() {
    super({ events: {} });
  }

  protected render(): string {
    return pageTemplate;
  }
}