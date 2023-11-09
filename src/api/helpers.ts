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