import "./index.scss";
import pageTemplate from "./template.hbs?raw";
import Block from "../../Core/Block";

export class MainPage extends Block {
  constructor() {
    super({ events: {} });
  }

  protected render(): string {
    return pageTemplate;
  }
}
