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
    message?: string;
    errors?: string;
    onClickSend?: () => void;
}

export class MessageList extends Block<IMessageListProps> {
    constructor(props: IMessageListProps) {
        props.onBlurMessage = () => this.validate();

        super({
            ...props,
            messages: mockListMessages,
            onClickSend: () => {
                const message = this.refs?.message?.value();

                console.log(message);
            },
        });
    }

    private validate() {
        const value = this.refs?.message.value();
        const error = validateMessage(value);

        this.props.message = value;

        if (error) {
            this.setProps({ ...this.props, errors: error });
            console.log(error);
            this.props.errors = error;

            return false;
        }
        this.setProps(this.props);

        return true;
    }

    render() {
        const { message = "", errors } = this.props;
        console.log(errors);
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
                    {{{ Input
                            ref="message"
                            type="text" 
                            classes="message-input"     
                            name="message"
                            value='${message}'
                            onBlur=onBlurMessage
                    }}}
                        ${this.props.errors}
                    {{{ BaseButton text="Send" onClick=onClickSend }}}
                </div>
            </div>
            `;
    }
}
