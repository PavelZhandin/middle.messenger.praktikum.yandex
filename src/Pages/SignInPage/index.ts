import Block from "../../Core/Block";
import { validateLogin, validatePassword } from "../../Utils/validators";
import pageTemplate from "./template.hbs?raw";

export class SignInPage extends Block {
    constructor() {
        super({
            validate: {
                login: validateLogin,
                password: validatePassword,
            },
            handleSubmit: (event: SubmitEvent) => {
                event.preventDefault();
                const login = this.refs.login.value();
                const password = this.refs.password.value();

                console.log({
                    login,
                    password,
                });
            },
        });
    }

    protected render(): string {
        return pageTemplate;
    }
}
