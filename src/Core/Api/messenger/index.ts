import { IChat } from "../../../Models/Chat";
import { IUser } from "../../../Models/IUser";
import HTTPClient from "../../Http";
import { ChatWebsocket } from "./chat.websocket";

const chatAPIInstance = new HTTPClient("/chats");

export class ChatAPI {
    public async getAll(): Promise<IChat[]> {
        try {
            return chatAPIInstance.get<IChat[]>("");
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    public async create(title: string): Promise<string> {
        return chatAPIInstance.post("", { data: { title } });
    }

    public async getToken(id: string): Promise<{ token: string }> {
        return chatAPIInstance.post("/token/".concat(id));
    }

    public async getUsers(id: string) {
        try {
            const currentChatUsers = (await chatAPIInstance.get(`/${id}/users`)) as IUser[];
            window.store.set({ currentChatUsers });
        } catch (error) {
            console.error(error);
        }
    }

    public async initChat(id: string) {
        try {
            const { chatSocket } = window.store.getState();

            if (chatSocket !== null) {
                chatSocket.close();
            }

            const { user } = window.store.getState();
            const { token } = await this.getToken(id);
            const wsClient = new ChatWebsocket(
                `wss://ya-praktikum.tech/ws/chats/${user?.id}/${id}/${token}`,
            );

            window.store.set({ chatSocket: wsClient });

            await wsClient.connect();
            wsClient.getMessages("0");
            this.getUsers(id);
        } catch (error) {
            console.error(error);
        }
    }

    public async addUser(chatId: string, userId: string) {
        try {
            const response = await chatAPIInstance.put("/users", {
                data: {
                    users: [parseInt(userId)],
                    chatId: parseInt(chatId),
                },
            });
            if (response === "OK") {
                this.getUsers(chatId);
            }
        } catch (error) {
            console.error(error);
        }
    }

    public async deleteUser(chatId: string, userId: number) {
        const { user } = window.store.getState();
        if (user?.id === userId) {
            return;
        }
        try {
            const response = await chatAPIInstance.delete("/users", {
                data: {
                    users: [userId],
                    chatId: parseInt(chatId),
                },
            });
            if (response === "OK") {
                this.getUsers(chatId);
            }
        } catch (error) {
            console.error(error);
        }
    }

    public async deleteChat(chatId: string) {
        try {
            const response: any = await chatAPIInstance.delete("", {
                data: {
                    chatId: parseInt(chatId),
                },
            });

            if (response.result.id === chatId) {
                window.store.set({
                    currentChatId: null,
                    currentChatUsers: null,
                    messages: null,
                });
                const chats = await this.getAll();
                window.store.set({ chats });
            }
        } catch (error) {
            console.error(error);
        }
    }
}
