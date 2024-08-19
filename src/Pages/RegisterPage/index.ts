/* eslint-disable camelcase */
import pageTemplate from "./template.hbs?raw";
import Block from "../../Core/Block";
import {
    validateEmail,
    validateLogin,
    validateName,
    validatePassword,
    validatePhone,
} from "../../Utils/validators";
import { AuthController } from "../../Core/Controllers/auth/authController";

interface IRegisterPageProps {
    validate?: (val: string) => string;
    handleSubmit?: () => void;
}

export class RegisterPage extends Block {
    constructor(props: IRegisterPageProps) {
        const authController = new AuthController();

        super({
            ...props,
            validate: {
                first_name: validateName,
                second_name: validateName,
                email: validateEmail,
                phone: validatePhone,
                login: validateLogin,
                password: validatePassword,
            },
            handleSubmit: (event: SubmitEvent) => {
                event.preventDefault();

                const login = this.refs.login.value();
                const password = this.refs.password.value();
                const first_name = this.refs.first_name.value();
                const second_name = this.refs.second_name.value();
                const phone = this.refs.phone.value();
                const email = this.refs.email.value();

                if (login && first_name && second_name && phone && email && password) {
                    authController.signup({
                        login,
                        password,
                        first_name,
                        second_name,
                        phone,
                        email,
                    });
                }

                console.log({
                    first_name,
                    second_name,
                    login,
                    email,
                    password,
                    phone,
                });
            },
        });
    }

    protected render(): string {
        return pageTemplate;
    }
}
