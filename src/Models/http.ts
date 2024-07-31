import { ERestMethod } from "../Enums/http";

export type TOptionsRequest = {
    data?: string;
    method?: ERestMethod;
    timeout?: number;
    headers?: Record<string, string>;
    params?: object;
};

export type THttpMethod = (url: string, options?: TOptionsRequest) => Promise<unknown>;
