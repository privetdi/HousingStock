import { MyRequest } from "./interface"

interface BodyConfig {
    method: string;
    headers?: { [key: string]: string; }
}


export const api = async <TResponse = null, TParams = undefined>(
    url: string,
    { method = 'GET', headers = {
        'Content-Type': 'application/json',
        'accept': "application/json",
    } }: BodyConfig,
    body?: TParams
): Promise<TResponse> => {
    const init: RequestInit = {
        method,
        headers
    }
    if (body) {
        init.body = JSON.stringify(body)
        console.log(init.body)
    }

    const res = await fetch(url, init)
    console.log(res)
    if (!res.ok) {
        throw new Error(res.statusText)
    }
    if (res.status === 204) {
        throw new Error(res.statusText)
    }

    const contentType = res.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
        const data = await res.json();
        console.log(data);
        return data;
    } else {
        throw new Error(res.statusText)
    }

}

export const requestData: MyRequest = {
    accept: "application/json",
};