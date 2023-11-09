import { MyRequest } from "./interface"

interface BodyConfig {
    method: string;
    headers?: { [key: string]: string; }
}

export function debounce<T extends (...args: any[]) => void>(func: T, delay: number) {
    let timeoutId: NodeJS.Timeout | null = null;
    let lastCallTimestamp = 0;
    return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
        const now = Date.now();
        if (!timeoutId || now - lastCallTimestamp >= delay) {
            func.apply(this, args);
            lastCallTimestamp = now;
        }
        clearTimeout(timeoutId!);
        timeoutId = setTimeout(() => {
            timeoutId = null;
        }, delay);
    };
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

export const requestData: MyRequest = {
    accept: "application/json",
};