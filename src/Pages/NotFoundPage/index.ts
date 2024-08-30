// import pageTemplate from "./template.hbs?raw";
import Block from "../../Core/Block";
import "./index.scss";

export class NotFoundPage extends Block {
    constructor() {
        super({ events: {} });
    }

    protected render(): string {
        return `
        {{#> MainContainer}}
<div class="notFound-page-container">
    <h1>404</h1>
    <h4 class="description">Не туда попали</h4>
    {{> Link class='link' label='назад к чатам' href='/messenger'}}
</div>
{{/ MainContainer}}

        `;
    }
}
