import "./index.scss";
import Block from "../../Core/Block";
import { AuthController } from "../../Core/Controllers/auth/authController";
import { UserAPI } from "../../Core/Api/user";
import { connect } from "../../Core/Store/connect";
import { IUser } from "../../Models/IUser";

interface ProfilePageProps extends Record<string, unknown> {
    user: IUser;
}

class ProfilePage extends Block<ProfilePageProps> {
    constructor(props: any) {
        const authController = new AuthController();
        const userAPI = new UserAPI();

        super({
            ...props,
            handleExitClick: () => {
                authController.logout();
            },
            handleEditAvatarClick: () => {
                const data = new FormData();
                data.append("avatar", this.refs.avatar?.refs?.input?.element?.files[0]);
                console.log(data);
                userAPI.editAvatar(data);
            },
            events: {},
        });
    }

    protected render(): string {
        let avatarSrc = "";
        const { avatar, email, login, first_name, second_name, display_name, phone } =
            this._props?.user || {};

        if (avatar !== null) {
            avatarSrc = `src="https://ya-praktikum.tech/api/v2/resources${avatar}"`;
        }

        return `
        <div class="profile-container">
            <div class="backButton-container">
                <a href="/messenger">Назад</a>
            </div>

            <div class="profile-info">
                {{{ ProfileAvatar ${avatarSrc} }}}
                {{{ InputValidated type="file" label="" ref="avatar" name="avatar" }}}
                {{{ BaseButton text="Изменить аватар" onClick=handleEditAvatarClick }}}
                <div class="properties-container">
                    {{> ProfileProperty key='Почта' value ="${email}"}}
                    {{> ProfileProperty key='Логин' value ="${login}"}}
                    {{> ProfileProperty key='Имя' value ="${first_name}"}}
                    {{> ProfileProperty key='Фамилия' value ="${second_name}"}}
                    {{> ProfileProperty key='Имя в чате' value ="${display_name}"}}
                    {{> ProfileProperty key='Телефон' value ="${phone}"}}
                </div>

                <div class="controlButtons-container">
                    <a href="/edit-profile">Изменить данные</a>
                    <a href="/edit-password">Изменить пароль</a>
                    {{{ BaseButton text="Выйти" className="exit-button" onClick=handleExitClick }}}
                </div>
            </div>
        </div>

        `;
    }
}

const ProfilePageWithStore = connect(({ user }) => ({ user }))(ProfilePage);
export { ProfilePageWithStore as ProfilePage };
