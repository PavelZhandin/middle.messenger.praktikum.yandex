import Block from "../../Core/Block";
import "./errorLine.css";

export class ErrorLine extends Block {
    protected render(): string {
        return `
            <div class="errorLine">{{error}}</div>
        `;
    }
}
