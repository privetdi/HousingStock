import { IRequest } from "./interface"

interface IBodyConfig {
    method: string;
    headers?: { [key: string]: string; }
}



export const api = async <TResponse = null, TParams = undefined>(
    url: string,
    { method = 'GET', headers = {
        'Content-Type': 'application/json',
        'accept': "application/json",
    } }: IBodyConfig,
    body?: TParams
): Promise<TResponse> => {
    const init: RequestInit = {
        method,
        headers,
    }
    if (body) {
        init.body = JSON.stringify(body)
    }
    const res = await fetch(url, init)
    const data = await res.json();
    if (!res.ok) {
        throw new Error(res.statusText)
    }
    return data;
}

export const requestData: IRequest = {
    accept: "application/json",
};