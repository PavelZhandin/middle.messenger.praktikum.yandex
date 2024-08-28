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
                const { currentChatId } = props;

                if (currentChatId && userId) {
                    chatAPI.deleteUser(currentChatId, userId);
                }
            },
            handleDeleteChatClick: () => {
                const { currentChatId } = props;

                if (currentChatId) {
                    chatAPI.deleteChat(currentChatId);
                }
            },
        });
    }

    protected render() {
        const { currentChatId, currentChatUsers } = this.props;

        if (currentChatId && currentChatUsers) {
            return `
                <div class="${styles.chatHeader}">
                    <div>
                        <h3>Список пользователей</h3>
                        <ul>
                            {{#each currentChatUsers }}
                                <li>{{ this.login }} ( id={{ this.id }})</li>
                            {{/each}}
                        </ul>
                    </div>
                    <div>
                        {{{ InputValidated
                                placeholder="id пользователя"
                                type="text"
                                label="id пользователя"
                                name="username"
                                ref="username"
                                validate=validateIsNotEmpty
                        }}}
                        {{{ BaseButton text="Добавить пользователя" onClick=handleAddUserClick }}}
                        {{{ BaseButton text="Удалить пользователя" onClick=handleDeleteUserClick }}}
                    </div>
                    <div>
                        {{{ BaseButton className="${styles.delete_btn}" text="Удалить чат" onClick=handleDeleteChatClick }}}
                    </div>
                </div>
      `;
        }
        return `
            <div class="${styles.empty_filler}">
                <h3>Выберите чат из списка или создайте новый</h3>
            </div>`;
    }
}

const ChatHeaderWithStore = connect(({ currentChatId, currentChatUsers }) => ({
    currentChatId,
    currentChatUsers,
}))(ChatHeader);

export { ChatHeaderWithStore };
