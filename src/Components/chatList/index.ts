import { IChat } from "../../Models/Chat";
import { Block, IProps } from "../../Core/Block";
import "./index.scss";
import { ChatAPI } from "../../Core/Api/messenger";
import { connect } from "../../Core/Store/connect";

interface IChatListProps extends IProps {
    chats: Partial<IChat>[];
}

class ChatList extends Block {
    constructor(props: IChatListProps) {
        super({
            ...props,
            handleAddChat: async () => {
                try {
                    const chatAPI = new ChatAPI();
                    const title = this.refs.chatTitle.value();
                    console.log(title);

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
            <div class="chat-list__container">
                <div class="chat-list__controls">
                    {{{ InputValidated
                        label="Название чата"
                        type="text"
                        name="chatTitle"
                        ref="chatTitle"
                        value=""
                    }}}
                    {{{ BaseButton text="Добавить чат" onClick=handleAddChat }}}
                </div>
                <div class="chat-list__chats">
                    {{#each chats}}
                        {{{ ChatItem 
                            id=id 
                            title=title 
                            last_message=last_message 
                            unread_count=unread_count 
                        }}}
                    {{/each}}
                </div>
            </div>
        `;
    }
}

const ChatPageWithStore = connect(({ chats, user }) => ({ chats, user }))(ChatList);
export { ChatPageWithStore as ChatList };
