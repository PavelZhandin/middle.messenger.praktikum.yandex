import "./index.scss";
import pageTemplate from "./template.hbs?raw";
import Block from "../../Core/Block";
import { validateEmail, validateLogin, validateName, validatePhone } from "../../Utils/validators";

interface IEditProfileDataPageProps {
    validate?: (val: string) => string;
    handleSubmit?: () => void;
}

export class EditProfileDataPage extends Block {
    constructor(props: IEditProfileDataPageProps) {
        super({
            ...props,
            validate: {
                email: validateEmail,
                login: validateLogin,
                first_name: validateName,
                second_name: validateName,
                display_name: validateLogin,
                phone: validatePhone,
            },
            handleSubmit: (event: SubmitEvent) => {
                event.preventDefault();
                const email = this.refs.email.value();
                const login = this.refs.login.value();
                const firstName = this.refs.first_name.value();
                const secondName = this.refs.second_name.value();
                const displayName = this.refs.display_name.value();
                const phone = this.refs.phone.value();
                if (
                    [email, login, firstName, secondName, displayName, phone].every(
                        (input) => !!input,
                    )
                ) {
                    console.log({
                        email,
                        login,
                        firstName,
                        secondName,
                        displayName,
                        phone,
                    });
                    alert("Данные корректны! (Детали в консоли)");
                } else {
                    alert("Проверьте корректность заполненных данных перед сохранением");
                }
            },
        });
    }

    protected render(): string {
        return pageTemplate;
    }
}
