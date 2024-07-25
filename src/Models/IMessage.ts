export interface IMessage {
    id: number;
    user_id: number;
    chat_id: number;
    time: string;
    type: string;
    content: number | string;
    main?: boolean;
}
