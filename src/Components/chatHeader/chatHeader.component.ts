import styles from "./chatHeader.module.scss";
import { connect } from "../../Core/Store/connect";
import Block from "../../Core/Block";
import { IUser } from "../../Models/IUser";
import { ChatAPI } from "../../Core/Api/messenger";

type IChatHeaderProps = {
    validateIsNotEmpty: () => string;
    currentChatId?: string;
    currentChatUsers: IUser[];
};

class ChatHeader extends Block<IChatHeaderProps> {
    constructor(props: IChatHeaderProps) {
        const chatAPI = new ChatAPI();
        super({
            ...props,
            handleAddUserClick: () => {
                const userId = this.refs.username.value();

                chatAPI.addUser(props.currentChatId as string, userId || "");
            },
            handleDeleteUserClick: () => {
                const userId = this.refs.username.value();
                chatAPI.deleteUser(props.currentChatId as string, userId || "");
            },
            handleDeleteChatClick: () => {
                chatAPI.deleteChat(props.currentChatId as string);
            },
        });
    }

    protected render() {
        const { currentChatId, currentChatUsers } = this.props;

        if (currentChatId && currentChatUsers) {
            const users = currentChatUsers.map((user: IUser) => `<li>${user.login}</li>`);
            return `
                <div class="${styles.chatHeader}">
                <div>
                    <h3>Список пользователей</h3>
                    <ul>
                    ${users}
                    </ul>
                </div>
                <div>
                    {{{ InputValidated 
                            type="text"
                            label="id пользователя"
                            name="username"
                            ref="username"
                            validate=validateIsNotEmpty
                    }}}
                    {{{ Button label="Добавить пользователя" onClick=handleAddUserClick }}}
                    {{{ Button label="Удалить пользователя" onClick=handleDeleteUserClick }}}
                </div>
                <div>
                    {{{ Button label="Удалить чат" onClick=handleDeleteChatClick }}}
                </div>
                </div>
      `;
        }
        return "<span></span>";
    }
}

const ChatHeaderWithStore = connect(({ currentChatId, currentChatUsers }) => ({
    currentChatId,
    currentChatUsers,
}))(ChatHeader);
export { ChatHeaderWithStore };
