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
    if (type == 'json') return await api.json()
    return await api.text()
}

export const getValueByKey = (obj: any, key: any): any[] | null | any => {
    const values: any = [];
    const find = (obj: any, key: string) => {
        try {
            if (!obj) return;
            if (obj[key]) {
                values.push({ [key]: obj[key] });
            }
            Object.values(obj).forEach(val => {
                if (typeof val === 'object') {
                    find(val, key);
                }
            });
        } catch (e) {
            return null;
        }
    }
    find(obj, key);
    return values;
}

export const SITE_TITLE = 'Kounter APi | Free Counter Web APi | CouterAPi Alternative';
export const SITE_DESCRIPTION = 'Kounter APi is a free API counter with more advanced features, simple and very efficient to use. Continue to support Kounter so that this platform remains active.';
export const SITE_IMAGE = url('/logo.png').href;

export const SITE_DOMAIN = 'kounter.vercel.app';
export const SITE_URL = url().href;

export const SET_HEADERS = {
    'Cache-Control': 'max-age=604800'
}