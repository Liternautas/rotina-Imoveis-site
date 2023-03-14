import { parseCookies, setCookie, destroyCookie } from "nookies";

export function useCookies() {
    const get = () => parseCookies();

    const set = (name: string, data: string, maxAge?: number) => {
        setCookie(undefined, name, data, { maxAge: maxAge ?? 60 * 60 * 24, path: '/', });
    }

    const remove = (name: string) => {
        destroyCookie(undefined, 'mobilar.user');
    }

    return {
        get,
        set,
        remove
    }
}