import { TAppState } from "../../Models/appState";

export const STORE_INITIAL_STATE: TAppState = {
    user: null,
    chats: null,
    currentChatId: null,
    chatSocket: null,
    messages: null,
    currentChatUsers: null,
};
