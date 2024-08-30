/* eslint-disable camelcase */
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
            },
        });
    }

    protected render(): string {
        return `
        {{#> AuthFormContainer}}
<form class="form">
    {{> FormHeader label='Регистрация'}}
    <div class="inputContainer">
        {{{ InputValidated ref="first_name" name="first_name" type="text" label="Имя" validate=validate.first_name }}}
        {{{ InputValidated ref="second_name" name="second_name" type="text" label="Фамилия" validate=validate.second_name }}}
        {{{ InputValidated ref="email" name="email" type="email" label="Почта" validate=validate.email }}}
        {{{ InputValidated ref="phone" name="phone" type="phone" label="Телефон" validate=validate.phone }}}
        {{{ InputValidated ref="login" name="login" type="text" label="Логин" validate=validate.login }}}
        {{{ InputValidated ref="password" name="password" type="password" label="Пароль" validate=validate.password }}}
        {{{ InputValidated 
            ref="repeat_password"
            name="repeat_password"
            type="password"
            label="Пароль (ещё раз)"
            validate=validate.password_repeat
        }}}
    </div>
    <div class="form-footer">
        {{{ BaseButton className="submit-button" text="Зарегистрироваться" onClick=handleSubmit }}}
        <a href="/signin" class="signIn-button">Войти</a>
    </div>
</form>
{{/ AuthFormContainer}}

        `;
    }
}
