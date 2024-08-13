import { ERestMethod } from "../../Enums/http";
import { THttpMethod, TOptionsRequest } from "../../Models/http";

function queryStringify(data: object) {
    let result = "?";

    Object.entries(data).forEach(([key, value]) => {
        result = result.concat(key, "=", value, "&");
    });

    return result;
}

class HTTPClient {
    private base: string = "https://ya-praktikum.tech/api/v2";

    constructor(endpoint: string) {
        this.base = this.base.concat(endpoint);
    }

    get: THttpMethod = (url, options = {}) => {
        return this.request(
            url,
            {
                ...options,
                method: ERestMethod.GET,
                data: queryStringify(options.params || {}) || "",
            },
            options.timeout,
        );
    };

    put: THttpMethod = (url, options = {}) => {
        return this.request(url, { ...options, method: ERestMethod.PUT }, options.timeout);
    };

    post: THttpMethod = (url, options = {}) => {
        return this.request(url, { ...options, method: ERestMethod.POST }, options.timeout);
    };

    delete: THttpMethod = (url, options = {}) => {
        return this.request(url, { ...options, method: ERestMethod.DELETE }, options.timeout);
    };

    request = (
        url: string,
        options: TOptionsRequest = { method: ERestMethod.GET },
        timeout = 5000,
    ) => {
        const { method, headers, data } = options;

        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            const isGet = method === ERestMethod.GET;

            xhr.timeout = timeout;
            xhr.open(method || ERestMethod.GET, isGet ? `${url}${data}` : url);

            if (headers) {
                Object.keys(headers).forEach((key) => xhr.setRequestHeader(key, headers[key]));
            }

            xhr.onload = () => {
                resolve(xhr);
            };

            xhr.onabort = reject;
            xhr.onerror = reject;
            xhr.ontimeout = reject;

            if (method === ERestMethod.GET || !data) {
                xhr.send();
            } else {
                xhr.send(JSON.stringify(data));
            }
        });
    };
}

export default HTTPClient;
