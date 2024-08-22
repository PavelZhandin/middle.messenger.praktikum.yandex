import "./index.scss";
import pageTemplate from "./template.hbs?raw";
import Block from "../../Core/Block";
import { initChats } from "../../Core/Api/messenger/initChats";

export class MainPage extends Block {
    constructor() {
        super({ events: {} });
        initChats();
    }

    protected render(): string {
        return pageTemplate;
    }
}
