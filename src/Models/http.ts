import { ERestMethod } from "../Enums/http";

export type TOptionsRequest = {
    data?: string | Record<string, unknown>;
    method?: ERestMethod;
    timeout?: number;
    headers?: Record<string, string>;
    params?: object;
};

export type THttpMethod<T = unknown> = (url: string, options?: TOptionsRequest) => Promise<T>;
