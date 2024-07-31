import Block, { IProps } from "../../Core/Block";
import { IMessage } from "../../Models/IMessage";
import "./message.scss";

export interface IMessageProps extends IProps {
    message: IMessage;
    myMessage: boolean;
}

export class Message extends Block<IMessageProps> {
    constructor(props: IMessageProps) {
        super({
            ...props,
        });
    }

    public renderForList = this.render;

    protected render(): string {
        const { message } = this.props;
        const { main, content } = message;

        return `
            <li class="message${main ? " message-my" : ""}">
                <article class="message__text">
                    <p>${content}</p>
                </article>
            </li>
        `;
    }
}
