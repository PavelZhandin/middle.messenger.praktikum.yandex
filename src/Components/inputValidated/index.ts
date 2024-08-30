import "./inputField.scss";
import Block from "../../Core/Block";

interface IInputValidatedProps {
    label?: string;
    name?: string;
    value?: string;
    type?: string;
    className?: string;
    validate: (str: string) => string;
}

export class InputValidated extends Block<any> {
    constructor(props: IInputValidatedProps) {
        super({
            ...props,
            onBlur: () => this.validate(),
        });
    }

    public value() {
        if (!this.validate()) {
            return false;
        }

        const input = this.refs.input.element as HTMLInputElement;
        return input.value;
    }

    private validate() {
        const input = this.refs.input.element as HTMLInputElement;
        const error = this._props.validate?.(input.value);

        if (error) {
            this.refs.errorLine.setProps({ error });
            return false;
        }

        this.refs.errorLine.setProps({ error: undefined });
        return true;
    }

    protected render(): string {
        const { name, label, type, value = "", className = "", placeholder = "" } = this._props;
        return `
      <div class="inputField">
        {{{ Input
          id="${name}"
          name="${name}"
          type="${type}"
          value="${value}"
          className="${className}"
          ref="input"
          onBlur=onBlur
          placeholder="${placeholder}"
        }}}
        <label for="${name}">
          ${label}
        </label>
        {{{ ErrorLine error=error ref="errorLine"}}}
      </div>
    `;
    }
}
