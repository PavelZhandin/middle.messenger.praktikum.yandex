type TListeners = {
    [event: string]: Array<(...args: Record<string, unknown>[]) => void>;
};

export default class EventBus {
    private readonly listeners: TListeners = {};

    constructor() {
        this.listeners = {};
    }

    // on(event: string, callback: (...args: Record<string, unknown>[]) => void) {
    on(event: string, callback: (...args: any) => void) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event].push(callback);
    }

    off(event: string, callback: (...args: Record<string, unknown>[]) => void) {
        if (!this.listeners[event]) {
            throw new Error(`Нет события: ${event}`);
        }

        this.listeners[event] = this.listeners[event].filter((listener) => listener !== callback);
    }

    // emit(event: string, ...args: Record<string, unknown>[]) {
    emit(event: string, ...args: any) {
        if (!this.listeners[event]) {
            // throw new Error(`Нет события: ${event}`);ret
            return;
        }

        this.listeners[event].forEach((listener) => {
            listener(...args);
        });
    }
}
