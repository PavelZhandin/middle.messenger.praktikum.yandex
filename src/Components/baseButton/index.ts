import Block, { IProps } from "../../Core/Block";
import "./baseButton.scss";

export class BaseButton extends Block {
    constructor(props: IProps) {
        super({
            ...props,
            events: {
                click: props.onClick,
            },
        });
    }

    protected render(): string {
        const { className } = this.props;

        return `
        <button class="button ${className}" type="button">
            {{ text }}
        </button>`;
    }
}
