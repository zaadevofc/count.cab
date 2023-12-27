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

export const SITE_TITLE = 'Kounter | Free Counter Web APi | CouterAPi Alternative';
export const SITE_DESCRIPTION = 'Kounter | Free Counter Web APi | CouterAPi Alternative';
export const SITE_IMAGE = url('/nulisan.png').href;

export const SITE_DOMAIN = 'kounter.vercel.app';
export const SITE_URL = url().href;

export const SET_HEADERS = {
    'Cache-Control': 'max-age=604800'
}