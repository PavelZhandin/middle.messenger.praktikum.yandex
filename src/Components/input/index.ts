import Block, { IProps } from "../../Core/Block";
import "./input.scss";

interface IInputProps extends IProps {
    className: string;
    placeholder: string;
    onBlur: () => void;
    ref: string;
    name: string;
    value: string;
    type: "text" | "password";
}

export class Input extends Block<IInputProps> {
    constructor(props: IInputProps) {
        super({
            ...props,
            events: {
                blur: props.onBlur || (() => {}),
            },
        });
    }

    public value() {
        const input = this.element as HTMLInputElement;
        return input.value;
    }

    protected render(): string {
        const { className, placeholder, ref, value, name, type } = this.props;

        return `
            <input
                class="${className}"
                placeholder="${placeholder || ""}"
                ref="${ref}"
                name="${name}"
                value="${value}"
                type="${type}" 
            />
        `;
    }
}
