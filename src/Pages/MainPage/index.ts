import "./index.scss";
import pageTemplate from "./template.hbs?raw";
import Block from "../../Core/Block";
import { initChats } from "../../Core/Api/messenger/initChats";
import { connect } from "../../Core/Store/connect";

class MainPage extends Block {
    constructor() {
        super({ events: {} });
        initChats();
    }

    protected render(): string {
        return pageTemplate;
    }
}

const MainPageWithStore = connect(({ currentChatId, messages, currentChatUsers }) => ({
    currentChatId,
    messages,
    currentChatUsers,
}))(MainPage);
export { MainPageWithStore as MainPage };
