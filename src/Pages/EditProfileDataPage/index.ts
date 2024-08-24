import "./index.scss";
// import pageTemplate from "./template.hbs?raw";
import Block from "../../Core/Block";
import { validateEmail, validateLogin, validateName, validatePhone } from "../../Utils/validators";
import { connect } from "../../Core/Store/connect";
import { UserAPI } from "../../Core/Api/user";
import { IUser } from "../../Models/IUser";

interface IEditProfileDataPageProps extends Record<string, unknown> {
    user: IUser;
    validate?: (val: string) => string;
    handleSubmit?: () => void;
}

class EditProfileDataPage extends Block<IEditProfileDataPageProps> {
    constructor(props: IEditProfileDataPageProps) {
        const userAPI = new UserAPI();

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
            handleEditAvatarClick: () => {
                const data = new FormData();
                data.append("avatar", this.refs.avatar.refs?.input.element.files[0]);
                userAPI.editAvatar(data);
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
                        first_name: firstName,
                        second_name: secondName,
                        login,
                        email,
                        display_name: displayName,
                        phone,
                    });
                    userAPI.editUser({
                        first_name: firstName,
                        second_name: secondName,
                        login,
                        email,
                        display_name: displayName,
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
        console.log(this.props.user);
        const { email, login, second_name, display_name, first_name, phone } =
            this.props.user || {};
        let avatarSrc = "";
        if (this.props.user !== null) {
            avatarSrc = `src="https://ya-praktikum.tech/api/v2/resources${this.props.user.avatar}"`;
        }
        return `
                <div class="profile-container">
                    <div class="backButton-container">
                        <a href="/profile">Назад</a>
                    </div>
                    <div class="profile-info">
                        {{{ ProfileAvatar ${avatarSrc} }}}
                        <form class="properties-container">
                            {{{ InputValidated 
                                ref="email"
                                name="email"
                                type="email"
                                label="Почта"
                                value="${email}"
                                validate=validate.email }}}
                            
                            {{{ InputValidated 
                                ref="login"
                                name="login"
                                type="text"
                                label="Логин"
                                value="${login}"
                                validate=validate.login
                            }}}
                            
                            {{{ InputValidated
                                ref="first_name"
                                name="first_name"
                                type="email" label="Логин"
                                value="${first_name}"
                                validate=validate.login
                            }}}
                            
                            {{{ InputValidated
                                ref="second_name"
                                name="second_name" 
                                type="text"
                                label="Фамилия"
                                value="${second_name}"
                                validate=validate.second_name
                            }}}
                            
                            {{{ InputValidated
                                ref="display_name"
                                name="display_name"
                                type="text" label="Имя в чате"
                                value="${display_name || ""}"
                                validate=validate.display_name
                            }}}

                            {{{ InputValidated
                                ref="phone"
                                name="phone"
                                type="phone"
                                value="${phone}"
                                label="Телефон"
                                validate=validate.phone
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

const EditProfilePageWithStore = connect(({ user }) => ({ user }))(EditProfileDataPage);
export { EditProfilePageWithStore as EditProfileDataPage };
