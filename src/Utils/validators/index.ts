export function validateName(value: string): string {
    return /^[А-ЯA-Z][а-яa-z-]*$/.test(value)
        ? ""
        : "Должно начинаться с заглавной буквы, содержать латиницу или кириллицу";
}

export function validateLogin(value: string): string {
    return /^(?![0-9]+$)[a-zA-Z0-9_-]{3,20}$/.test(value)
        ? ""
        : "от 3 до 20 символов, латиница, без пробелов, без спецсимволов.";
}

export function validateEmail(value: string): string {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z]+\.[a-zA-Z]+$/.test(value)
        ? ""
        : "Неправильно заполнен адрес почты.";
}

export function validatePhone(value: string): string {
    return /^\+?\d{10,15}$/.test(value)
        ? ""
        : "от 10 до 15 символов, состоит из цифр, может начинается с плюса.";
}

export function validatePassword(value: string): string {
    return /^(?=.*[A-Z])(?=.*\d).{8,40}$/.test(value)
        ? ""
        : "от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра.";
}

export function validateMessage(message: string): string {
    if (message.length === 0) return `Сообщение должно содержать хотя бы один символ`;
    return "";
}
