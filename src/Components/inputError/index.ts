import "./index.scss";
import Block from "../../Core/Block";

class InputError extends Block {
    protected render(): string {
        return `<span class="errorLine">{{error}}</span>`;
    }
}

export { InputError };
