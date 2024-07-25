import Block, { IProps } from "../../Core/Block";
import { mockListMessages } from "../../Mocks/messageList";
import { IMessage } from "../../Models/IMessage";
import { IUser } from "../../Models/IUser";
import "./messageList.scss";

interface IMessageListProps extends IProps {
    messages: IMessage[];
    currentUser: Partial<IUser>;
    onBlurMessage?: () => void;
    message?: string;
    onClickSend?: () => void;
}

export class MessageList extends Block<IMessageListProps> {
    constructor(props: IMessageListProps) {
        super({
            ...props,
            messages: mockListMessages,
            onClickSend: () => {
                console.log("Click!!!");
            },
        });
    }

    render() {
        const { messages } = this.props;
        console.log(messages);

        return `
            <div class="message-list">
                <div class="message-list__header">
                        <div class="message-list__header__avatar">
                            <span>Name</span>
                        </div>
                        {{{ Button type="dots"}}}
                </div>
                <ul class="message-list__main">
                {{#each messages}}
                    <div class="message-list__main__message">
                        {{{Message message = this }}}
                    </div>
                {{/each}}
                </ul>
                <div class="message-list__footer">
                    <input 
                        placeholder="Сообщение" 
                        name="message" 
                        class="message-input" 
                        type="text" 
                    />

                    {{{ BaseButton text="Click on me" onClick=onClickSend }}}
                </div>
            </div>
            `;
    }
}
