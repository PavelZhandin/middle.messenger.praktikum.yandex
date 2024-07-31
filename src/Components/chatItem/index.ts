import { Block, IProps } from "../../Core/Block";
import { IChat } from "../../Models/Chat";
import "./index.scss";

interface IChatListProps extends IProps {
    chats: Partial<IChat>;
}

export class ChatItem extends Block {
    constructor(props: IChatListProps) {
        super({
            ...props,
            events: {
                click: () => {
                    console.log("clicked");
                },
            },
        });
    }

    protected render() {
        return `
            <div class="chatItem">
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
