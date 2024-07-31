import { IChat } from "../../Models/Chat";
import { Block, IProps } from "../../Core/Block";
import { chatList } from "../../Mocks/chatList";
import "./index.scss";

interface IChatListProps extends IProps {
    chats: Partial<IChat>[];
}

export class ChatList extends Block {
    constructor(props: IChatListProps) {
        super({
            ...props,
            chats: chatList,
        });
    }

    render(): string {
        return `<div class="chat-list-container">
                <div class="chat-list__chats">
                    {{#each chats}}
                        {{{ ChatItem title=title }}}
                    {{/each}}
                </div>
            </div>`;
    }
}
