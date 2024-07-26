import Block, { IProps } from "../../Core/Block.ts";
import "./input.scss";

interface IInputProps extends IProps {
    classes: string,
    placeholder: string,
    onBlur:()=>void,
    ref:string,
    name:string,
    value:string
    type: 'text' | 'password',
}

export class Input extends Block<IInputProps> {
    constructor(props: IInputProps) {
        props.events={
            blur: props.onBlur || (() => {})
        };
        super(props)
    }

    protected render(): string {
        const { classes, placeholder,ref,value, name, type } = this.props;
        
        return (`
            <input
                class="${classes}"
                placeholder="${placeholder || ''}"
                ref="${ref}"
                name="${name}"
                value="${value}"
                type="${type}" 
            />
        `)
    }
}
