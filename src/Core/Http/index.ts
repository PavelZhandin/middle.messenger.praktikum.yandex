import { ERestMethod } from "../../Enums/http";
// import { THttpMethod, TOptionsRequest } from "../../Models/http";

function queryStringify(data: object): string {
    let query = "?";
    // eslint-disable-next-line no-restricted-syntax
    for (const [key, value] of Object.entries(data)) {
        query = query.concat(encodeURIComponent(key), "=", encodeURIComponent(value), "&");
    }
    query = query.slice(0, -1);
    return query;
}

function setHeaders(xhr: XMLHttpRequest, headers: object) {
    Object.entries(headers).forEach(([header, value]) => {
        xhr.setRequestHeader(header, value);
    });
}

interface Options {
    timeout?: number;
    data?: object;
    method?: string;
    headers?: object;
    query?: object;
}

export class HTTPClient {
    private base: string = "https://ya-praktikum.tech/api/v2";

    constructor(endpoint: string) {
        this.base = this.base.concat(endpoint);
    }

    get<TResponse>(path: string, options: Options = {}): Promise<TResponse> {
        return this.request<TResponse>(
            this.base.concat(path).concat(queryStringify(options.data ?? {})),
            { ...options, method: ERestMethod.GET },
            options.timeout,
        );
    }

    put(path: string, options: Options = {}) {
        return this.request(
            this.base.concat(path),
            { ...options, method: ERestMethod.PUT },
            options.timeout,
        );
    }

    // post: THttpMethod = (url, options = {}) => {
    //     return this.request(url, { ...options, method: ERestMethod.POST }, options.timeout);
    // };

    post<TResponse>(path: string, options: Options = {}): Promise<TResponse> {
        return this.request<TResponse>(
            this.base.concat(path),
            { ...options, method: ERestMethod.POST },
            options.timeout,
        );
    }

    delete(path: string, options: Options = {}) {
        return this.request(
            this.base.concat(path),
            { ...options, method: ERestMethod.DELETE },
            options.timeout,
        );
    }

    request<TResponse>(
        url: string,
        options: Options = { method: ERestMethod.GET },
        timeout = 5000,
    ) {
        const { method, query = {}, headers = {}, data } = options;

        return new Promise<TResponse>((resolve, reject) => {
            const xhr = new XMLHttpRequest();

            xhr.timeout = timeout;
            xhr.open(method || ERestMethod.GET, url.concat(queryStringify(query)));

            setHeaders(xhr, headers);

            xhr.onload = function () {
                try {
                    resolve(JSON.parse(xhr.response));
                } catch (e) {
                    resolve(this.response);
                }
            };

            xhr.onabort = reject;
            xhr.onerror = reject;
            xhr.ontimeout = reject;

            xhr.withCredentials = true;

            if (method === ERestMethod.GET || !data) {
                xhr.send();
            } else if (data instanceof FormData) {
                xhr.send(data);
            } else {
                xhr.setRequestHeader("Content-type", "application/json");
                xhr.send(JSON.stringify(data));
            }
        });
    }
}
