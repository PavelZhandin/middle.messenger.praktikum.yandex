// import { ChatItem } from "../index.ts";
// import { IChatItemProps } from "../chat-item/chat-item.ts";
// import template from "./chatList.hbs?raw";
import { IChat } from "../../Models/Chat";
import { Block, IProps } from "../../Core/Block";

interface IChatListProps extends IProps {
    chats: Partial<IChat>[];
}

export class ChatList extends Block {
    constructor(props: IChatListProps) {
        super({
            ...props,
            chats: [{ title: "Иван1" }, { title: "Иван2" }, { title: "Иван3" }],
        });
    }

    protected render(): string {
        // const { list } = this.props as IChatListProps;

        return `<div class="chat-list">
            <ul class="chat-list__chats">
                {{#each chats}}
                    {{{ title }}}
                {{/each}}
            </ul>
            </div>`;
    }
}
