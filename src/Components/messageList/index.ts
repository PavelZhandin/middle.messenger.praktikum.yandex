import Block, { IProps } from "../../Core/Block";
import { mockListMessages } from "../../Mocks/messageList";
import { IMessage } from "../../Models/IMessage";
import { IUser } from "../../Models/IUser";
import { validateMessage } from "../../Utils/validators";
import "./messageList.scss";

interface IMessageListProps extends IProps {
    messages: IMessage[];
    currentUser: Partial<IUser>;
    onBlurMessage?: () => void;
    validate?: (val: string) => string;
    message?: string;
    handleSubmit?: () => void;
}

export class MessageList extends Block<IMessageListProps> {
    constructor(props: IMessageListProps) {
        super({
            ...props,
            messages: mockListMessages,
            handleSubmit: () => {
                const message = this.refs?.message?.value();

                console.log({ message });
            },
            validate: validateMessage,
        });
    }

    render() {
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
                    {{{ InputValidated
                        ref="message"
                        label="Сообщение"
                        name="message"
                        validate=validate 
                        className="message-input"
                    }}}
                    {{{ InputError error=error ref="inputError"}}}
                    {{{ BaseButton text="Send" onClick=handleSubmit }}}
                </div>
            </div>
            `;
    }
}
