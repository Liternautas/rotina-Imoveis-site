import axios from "axios";
import {parseCookies} from "nookies";

export function getApi(ctx?: any) {
    const { 'imob.token': token } = parseCookies(ctx);
    const api = axios.create({
        baseURL: process.env.NEXT_PUBLIC_BASE_URL
    })
    if (token) api.defaults.headers['Authorization'] = `Bearer ${token}`;
    return api;
}
export const api = getApi();