/* eslint-disable no-unused-expressions */
import "./index.scss";
import Block from "../../Core/Block";
import { validatePassword } from "../../Utils/validators";
import { UserAPI } from "../../Core/Api/user";
import { connect } from "../../Core/Store/connect";
import { IUser } from "../../Models/IUser";

interface IEditPasswordPageProps extends Record<string, unknown> {
    user: IUser;
    validate?: (val: string) => string;
    handleSubmit?: () => void;
}

class EditPasswordPage extends Block<IEditPasswordPageProps> {
    constructor(props: IEditPasswordPageProps) {
        const userAPI = new UserAPI();

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
                    userAPI.editPassword({ oldPassword, newPassword });
                    alert("Данные корректны! (Детали в консоли)");
                }
            },
        });
    }

    protected render(): string {
        let avatarSrc = "";
        if (this._props.user) {
            avatarSrc = `src="https://ya-praktikum.tech/api/v2/resources${this._props.user?.avatar}"`;
        }
        return `
        <div class="editPassword-container">
            <div class="backButton-container">
                <a href="/profile">Назад</a>
            </div>
            <div class="profile-info">
                {{{ ProfileAvatar ${avatarSrc} }}}
                <form action="/messenger" class="properties-container">
                    {{{ InputValidated 
                        ref="oldPassword"
                        name="oldPassword"
                        type="password"
                        label="Старый пароль"
                        validate=validate.oldPassword
                        value=""
                    }}}
                    {{{ InputValidated
                        ref="newPassword"
                        name="newPassword"
                        type="password"
                        label="Новый пароль"
                        validate=validate.newPassword
                    }}}
                    {{{ InputValidated
                        ref="newPasswordRepeat"
                        name="newPasswordRepeat"
                        type="password" label="Новый пароль"
                        validate=validate.newPassword
                    }}}

                    <div class="controlButtons-container">
                        {{{ BaseButton className="submit-button" text="Сохранить" onClick=handleSubmit }}}
                    </div>
                </form>
            </div>
        </div>
        `;
    }
}

const EditPasswordPageWithStore = connect(({ user }) => ({ user }))(EditPasswordPage);
export { EditPasswordPageWithStore as EditPasswordPage };
