export default class EventBus {
  private readonly listeners: {
    [event: string]: Array<(...args: Record<string, unknown>[]) => void>;
  } = {};

  constructor() {
    this.listeners = {};
  }

  /**
   * Подписка на событие
   * @param event
   * @param callback
   */
  on(event: string, callback: (...args: Record<string, unknown>[]) => void) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
  }

  /**
   * Отписка
   * @param event
   * @param callback
   */
  off(event: string, callback: (...args: Record<string, unknown>[]) => void) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event] = this.listeners[event].filter(
      (listener) => listener !== callback,
    );
  }

  /**
   * Триггер события
   * @param event
   * @param args
   */
  emit(event: string, ...args: Record<string, unknown>[]) {
    if (!this.listeners[event]) {
      // throw new Error(`Нет события: ${event}`);ret
      return;
    }

    this.listeners[event].forEach((listener) => {
      listener(...args);
    });
  }
}
