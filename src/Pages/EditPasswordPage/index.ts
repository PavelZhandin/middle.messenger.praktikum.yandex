/* eslint-disable no-unused-expressions */
import "./index.scss";
import template from "./template.hbs?raw";
import Block from "../../Core/Block";
import { validatePassword } from "../../Utils/validators";

interface IEditPasswordPageProps {
    validate?: (val: string) => string;
    handleSubmit?: () => void;
}

export class EditPasswordPage extends Block {
    constructor(props: IEditPasswordPageProps) {
        super({
            ...props,
            validate: {
                oldPassword: validatePassword,
                newPassword: validatePassword,
                newPasswordRepeat: validatePassword,
            },
            handleSubmit: (event: SubmitEvent) => {
                event.preventDefault();
                const oldPassword = this.refs.oldPassword.value();
                const newPassword = this.refs.newPassword.value();
                const newPasswordRepeat = this.refs.newPasswordRepeat.value();

                const allValid = Boolean(oldPassword && newPassword && newPasswordRepeat);
                const passwordsMatch = newPassword === newPasswordRepeat;

                !allValid && alert("Проверьте корректность заполненных данных перед сохранением");

                !passwordsMatch && alert("Пароли не совпадают!");

                if (allValid && passwordsMatch) {
                    console.log({
                        newPassword,
                    });
                    alert("Данные корректны! (Детали в консоли)");
                }
            },
        });
    }

    protected render(): string {
        return template;
    }
}
