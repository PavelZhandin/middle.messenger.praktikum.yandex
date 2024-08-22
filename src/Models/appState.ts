import { ChatWebsocket } from "../Core/Api/messenger/chat.websocket";
import { IChat } from "./Chat";
import { IMessage } from "./IMessage";
import { IUser } from "./IUser";

export type TAppState = {
    user: Nullable<IUser>;
    chats: Nullable<IChat[]>;
    currentChatId: Nullable<string>;
    chatSocket: Nullable<ChatWebsocket>;
    messages: Nullable<IMessage[]>;
    currentChatUsers: Nullable<IUser[]>;
};
