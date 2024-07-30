export function validateMessage(message: string): string {
    if (message.length === 0) return `Message can not be blank`;
    return "";
}
