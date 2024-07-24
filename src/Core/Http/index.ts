// eslint-disable-next-line no-shadow
export enum ERequestMethod {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE",
}

type TOptionsRequest = {
    data: string;
    method: ERequestMethod;
    timeout: number;
    headers: Record<string, string>;
    params: object;
};

type HTTPMethod = (url: string, options?: Partial<TOptionsRequest>) => Promise<unknown>;

/**
 *  Get string of query params from object params
 * @param data
 */
function queryStringify(data: object) {
    let result = "?";
    result += Object.entries(data)
        .map(([key, value]) => {
            return `${key}=${Array.isArray(value) ? value.join(",") : String(value)}`;
        })
        .join("&");
    return result;
}

class HTTPTransport {
    get: HTTPMethod = (url, options = {}) => {
        return this.request(
            url,
            {
                ...options,
                data: queryStringify(options.params || {}) || "",
                method: ERequestMethod.GET,
            },
            options.timeout,
        );
    };

    put: HTTPMethod = (url, options = {}) => {
        return this.request(url, { ...options, method: ERequestMethod.PUT }, options.timeout);
    };

    post: HTTPMethod = (url, options = {}) => {
        return this.request(url, { ...options, method: ERequestMethod.POST }, options.timeout);
    };

    delete: HTTPMethod = (url, options = {}) => {
        return this.request(url, { ...options, method: ERequestMethod.DELETE }, options.timeout);
    };

    request = (
        url: string,
        options: Partial<TOptionsRequest> = { method: ERequestMethod.GET },
        timeout = 5000,
    ) => {
        const { method, headers, data } = options;

        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.timeout = timeout;
            const isGet = method === ERequestMethod.GET;
            xhr.open(method || ERequestMethod.GET, isGet ? `${url}${data}` : url);

            if (headers) {
                Object.keys(headers).forEach((key) => xhr.setRequestHeader(key, headers[key]));
            }

            xhr.onload = () => {
                resolve(xhr);
            };

            xhr.onabort = reject;
            xhr.onerror = reject;
            xhr.ontimeout = reject;

            if (method === ERequestMethod.GET || !data) {
                xhr.send();
            } else {
                xhr.send(JSON.stringify(data));
            }
        });
    };
}

export default HTTPTransport;
