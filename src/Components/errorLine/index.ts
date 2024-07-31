import Block from "../../Core/Block";
import "./errorLine.scss";

export class ErrorLine extends Block {
    protected render(): string {
        return `
            <div class="errorLine">{{error}}</div>
        `;
    }
}
