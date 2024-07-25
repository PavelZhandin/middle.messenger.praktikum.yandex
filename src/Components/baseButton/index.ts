import Block, { IProps } from "../../Core/Block";
import "./baseButton.scss";

export interface IBaseButtonProps {}
export class BaseButton extends Block<IBaseButtonProps> {
    constructor(props: IProps) {
        super({
            ...props,
            events: {
                click: props.onClick,
            },
        });
    }

    protected render(): string {
        return `
        <button class="button" type="button">
            {{ text }}
        </button>`;
    }
}
