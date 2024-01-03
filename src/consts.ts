import { JWT } from 'node-jsonwebtoken';

const secretKey = process.env.NEXT_PUBLIC_JWT_SECRET as string;
const jwt = new JWT(secretKey);

export const url = (path?: string) => {
    let check = process.env.NODE_ENV == 'production';
    let isDev = process.env.NEXT_PUBLIC_DEV_URL;
    let isProd = process.env.NEXT_PUBLIC_PROD_URL;
    return check ? new URL(path as string, isProd) : new URL(path as string, isDev);
}

export const signJWT = async (obj: any, exp?: any) => {
    try {
        let token: any = await jwt.sign(obj, { expiresIn: '30d', algorithm: 'HS256' })
        return token;
    } catch (e) {
        console.log(e);
        return false
    }
}

export const verifyJWT = async (token: any) => {
    try {
        let v: any = await jwt.verify(token)
        delete v.iat;
        delete v.exp;
        return v
    } catch (e) {
        return false
    }
}

export const groupBy = (obj: any[], key: string) => obj.reduce((rv, x) => (rv[x[key]] = rv[x[key]] || []).push(x) && rv, {});

export const fetchAPi = async (url: string, type: 'text' | 'json') => {
    let api = await fetch(url)
    if (api.status !== 200) return false
    if (type == 'json') return await api.json()
    return await api.text()
}

export const tempArray = (length: number) => [...new Array(length)]
export const randomID = () => Math.random().toString(36).substring(2, 30)

export const parseImgAuth = (picture: string) => {
    const source = ["cdn.discordapp.com", "lh3.googleusercontent.com", "avatars.githubusercontent.com"];
    const find = source.find(x => picture?.includes(x));
    const change = picture?.replace(/=s96-c/, "=s500-c");
    return change || picture;
}

export const parseReqSend = (status: number, data?: any) => {
    if (status == 200) return { ok: true, status, data }
    if (status == 401) return { ok: false, status, message: 'Unauthorized' }
    if (status == 403) return { ok: false, status, message: 'Has Exceeded The Maximum Limit' }
    if (status == 404) return { ok: false, status, message: 'Not Found' }
    if (status == 405) return { ok: false, status, message: 'Method Not Allowed' }
    if (status == 500) return { ok: false, status, message: 'Internal Server Error' }
}

export const SITE_TITLE = 'Kounter APi | Free Counter Web APi | CouterAPi Alternative';
export const SITE_DESCRIPTION = 'Kounter APi is a free API counter with more advanced features, simple and very efficient to use. Continue to support Kounter so that this platform remains active.';
export const SITE_IMAGE = url('/kounter-api-banner.jpeg').href;

export const SITE_DOMAIN = 'kounter.vercel.app';
export const SITE_URL = url().href;

export const VISIT_MAIN_API = process.env.NEXT_PUBLIC_VISIT_MAIN_API as string
export const VISIT_DASHBOARD_API = process.env.NEXT_PUBLIC_VISIT_DASHBOARD_API as string