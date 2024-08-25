import { ChatAPI } from "../../Core/Api/messenger";
import { Block, IProps } from "../../Core/Block";
import styles from "./index.module.scss";

interface IChatListProps extends IProps {
    last_message: {
        user: {
            avatar: string;
        };
        time: Date;
    };
    id: Nullable<string>;
    userImage: Optional<string>;
    unread_count: number;
}

export class ChatItem extends Block<IChatListProps> {
    constructor(props: IChatListProps) {
        super({
            ...props,
            events: {
                click: () => {
                    const { id } = props;
                    window.store.set({ currentChatId: id });
                    const chatAPI = new ChatAPI();
                    chatAPI.initChat(id as string);
                },
            },
        });
    }

    protected render() {
        // const { chats } = window.store.getState();
        let avatarSrc = "";
        let formattedTime;
        const { user, time } = this.props?.last_message || {};
        const formatter = new Intl.DateTimeFormat("en-US", {
            hour: "2-digit",
            minute: "2-digit",
        });
        if (time) {
            const date = new Date(time);
            formattedTime = formatter.format(date);
        } else {
            formattedTime = "";
        }

        if (user) {
            avatarSrc = `src="https://ya-praktikum.tech/api/v2/resources${user.avatar}"`;
        }

        return `
            <div class="${styles.chatItem}">
                <div class="${styles.userImageContainer}">
                    {{{ ProfileAvatar isSmall="true" ${avatarSrc} }}}
                </div>
                <div class="${styles.messageContainer}">
                    <span class="${styles.title}">
                        {{ title }}
                    </span>
                    <div class="${styles.message}">
                        {{last_message.content}}
                    </div>
                    <div class="${styles.newMessages}">
                        {{unread_count}}
                    </div>
                    <div class="${styles.time}">
                        ${formattedTime}
                    </div>
                </div>
            </div>
        `;
    }
}
