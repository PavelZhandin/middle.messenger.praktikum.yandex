import pageTemplate from "./template.hbs?raw";
import Block from "../../Core/Block";
import {
    validateEmail,
    validateLogin,
    validateName,
    validatePassword,
    validatePhone,
} from "../../Utils/validators";

interface IRegisterPageProps {
    validate?: (val: string) => string;
    handleSubmit?: () => void;
}

export class RegisterPage extends Block {
    constructor(props: IRegisterPageProps) {
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
                const firstName = this.refs.first_name.value();
                const secondName = this.refs.second_name.value();
                const phone = this.refs.phone.value();
                const email = this.refs.email.value();

                console.log({
                    firstName,
                    secondName,
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
