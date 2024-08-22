import { ERestMethod } from "../../Enums/http";
// import { THttpMethod, TOptionsRequest } from "../../Models/http";

function queryStringify(data: object) {
    let result = "?";

    Object.entries(data).forEach(([key, value]) => {
        result = result.concat(key, "=", value, "&");
    });

    return result;
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

class HTTPClient {
    private base: string = "https://ya-praktikum.tech/api/v2";

    constructor(endpoint: string) {
        this.base = this.base.concat(endpoint);
    }

    get<TResponse>(path: string, options: Options = {}): Promise<TResponse> {
        return this.request<TResponse>(
            this.base.concat(path),
            {
                ...options,
                method: ERestMethod.GET,
                query: options.data,
            },
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

export default HTTPClient;
