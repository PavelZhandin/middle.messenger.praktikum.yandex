import Block, { IProps } from "../../Core/Block";
import { connect } from "../../Core/Store/connect";
import { IUser } from "../../Models/IUser";
import { validateMessage } from "../../Utils/validators";
import "./messageList.scss";

interface IMessageListProps extends IProps {
    currentUser: Partial<IUser>;
    onBlurMessage?: () => void;
    validate?: (val: string) => string;
    message?: string;
    handleSubmit?: () => void;
    currentChatId?: string;
    currentChatUsers: IUser[];
}

class MessageList extends Block<IMessageListProps> {
    constructor(props: IMessageListProps) {
        super({
            ...props,
            handleSubmit: () => {
                const message = this.refs?.message?.value();
                const { chatSocket } = window.store.getState();
                if (message === "") {
                    return;
                }
                if (message) {
                    chatSocket?.sendMessage(message);
                }
            },
            validate: validateMessage,
        });
    }

    render() {
        const { currentChatId, currentChatUsers } = this.props;
        if (currentChatId && currentChatUsers) {
            return `
                <div class="message-list">
                    <ul class="message-list__main">
                        {{#each messages}}
                            <div class="message-list__main__message">
                                {{{Message message = this }}}
                            </div>
                        {{/each}}
                    </ul>
                        <form class="message-list__footer">
                            {{{ InputValidated
                                ref="message"
                                name="message"
                                validate=validate 
                                className="message-input"
                            }}}
                            {{{ InputError error=error ref="inputError"}}}
                            {{{ BaseButton text="Send" onClick=handleSubmit className="footer_button" }}}
                        </form>
                </div>
            `;
        }
        return `<span/>`;
    }
}

const MessageListWithStore = connect(({ currentChatId, messages, currentChatUsers }) => ({
    currentChatId,
    currentChatUsers,
    messages,
}))(MessageList);
export { MessageListWithStore as MessageList };
