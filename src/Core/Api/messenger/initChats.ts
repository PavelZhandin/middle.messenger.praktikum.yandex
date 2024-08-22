import { ChatAPI } from ".";

async function initChats() {
    const chatAPI = new ChatAPI();
    const chats = await chatAPI.getAll();

    window.store.set({ chats });
}

export { initChats };
