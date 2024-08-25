import Block from "../../Core/Block";
import { AuthController } from "../../Core/Controllers/auth/authController";
import { validateLogin, validatePassword } from "../../Utils/validators";
import pageTemplate from "./template.hbs?raw";

export class SignInPage extends Block {
    constructor() {
        const authController = new AuthController();

        super({
            validate: {
                login: validateLogin,
                password: validatePassword,
            },
            handleSubmit: (event: SubmitEvent) => {
                event.preventDefault();
                const login = this.refs.login.value();
                const password = this.refs.password.value();

                if (login && password) {
                    authController.signin({ login, password });
                }

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
