import { ChatAPI } from "../../Core/Api/messenger";
import { Block, IProps } from "../../Core/Block";
import { IChat } from "../../Models/Chat";
import "./index.scss";

interface IChatListProps extends IProps {
    id: Nullable<string>;
    userImage: Optional<string>
}

export class ChatItem extends Block {
    constructor(props: IChatListProps) {
        super({
            ...props,
            events: {
                click: () => {
                    const { id } = props;
                    window.store.set({ currentChatId: id });
                    const chatAPI = new ChatAPI();
                    chatAPI.initChat(id as string);
                    console.log("clicked");
                },
            },
        });
    }

    protected render() {
        let avatarSrc = "";

        if (this.props?.userImage) {
            avatarSrc = `src="https://ya-praktikum.tech/api/v2/resources${this.props.userImage}"`;
        }

        return `
            <div class="chatItem">
                <div class="userImageContainer">
                    {{{ UserImage isSmall="true" ${avatarSrc} }}}
                </div>
                <div class="messageContainer">
                    <span class="styles.title">
                        {{title}}
                    </span>
                    <div class="styles.message">
                        {{message.content}}
                    </div>
                </div>
            </div>
        `;
    }
}
