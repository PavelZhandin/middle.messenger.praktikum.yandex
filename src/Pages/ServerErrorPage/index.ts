
import pageTemplate from "./template.hbs?raw";
import "./index.scss";
import Block from "../../Core/Block";

export class ServerErrorPage extends Block {
  constructor() {
    super({ events: {} });
  }

  protected render(): string {
    return pageTemplate;
  }
}
