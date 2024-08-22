import { IChat } from "../../Models/Chat";
import { Block, IProps } from "../../Core/Block";
// import { chatList } from "../../Mocks/chatList";
import "./index.scss";
import { ChatAPI } from "../../Core/Api/messenger";

interface IChatListProps extends IProps {
    chats: Partial<IChat>[];
}

export class ChatList extends Block {
    constructor(props: IChatListProps) {
        super({
            ...props,
            // chats: chatList,
            handleAddChat: async () => {
                try {
                    const chatAPI = new ChatAPI();
                    const title = this.refs.chatTitle.value();

                    if (title) {
                        await chatAPI.create(title);
                    }

                    const chats = await chatAPI.getAll();
                    window.store.set({ chats });
                } catch (error) {
                    console.error(error);
                }
            },
        });
    }

    render(): string {
        return `
            <div class="chat-list-container">
                {{{ BaseButton text="Добавить чат" onClick=handleAddChat }}}
                <div class="chat-list__chats">
                    {{#each chats}}
                        {{{ ChatItem title=title }}}
                    {{/each}}
                </div>
            </div>
        `;
    }
}
