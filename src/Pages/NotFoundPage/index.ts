import pageTemplate from "./template.hbs?raw";
import Block from "../../Core/Block";
import "./index.scss";

// export { default as NotFoundPage } from "./template.hbs?raw";

export class NotFoundPage extends Block {
  constructor() {
    super({ events: {} });
  }

  protected render(): string {
    return pageTemplate;
  }
}
