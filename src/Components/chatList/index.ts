import { IChat } from "../../Models/Chat";
import { Block, IProps } from "../../Core/Block";
// import { chatList } from "../../Mocks/chatList";
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
            // chats: chatList,
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
            <div class="chat-list-container">
                {{{ InputField 
                    label="Название чата"
                    type="text"
                    ref="chatTitle"
                    name="chatTitle"
                    value=""
                }}}
                {{{ InputValidated
                    label="Название чата"
                    type="text"
                    name="chatTitle"
                    ref="chatTitle"
                    value=""
                }}}
                {{{ BaseButton text="Добавить чат" onClick=handleAddChat }}}
                <div class="chat-list__chats">
                    {{#each chats}}
                        {{{ ChatItem id=id title=title message=last_message date=date }}}
                    {{/each}}
                </div>
            </div>
        `;
    }
}

const ChatPageWithStore = connect(({ chats }) => ({ chats }))(ChatList);
export { ChatPageWithStore as ChatList };
