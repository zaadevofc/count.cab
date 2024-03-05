import { groupBy, signJWT } from "~/consts";

type FetchConfig = { uri: string | URL | any; method: 'GET' | 'POST'; body?: any; authToken?: string }

export const fetchJson = async (config: FetchConfig) => {
    let req = await fetch(config.uri, {
        cache: 'default', method: config.method, headers: {
            'Content-Type': 'application/json',
            ...(config.authToken && { 'Authorization': `ZDAuth ${config.authToken}` }),
        }, ...(config.body && { body: JSON.stringify(config.body) }),
    })
    return req
}

export const fetchKounterList = async ({ queryKey }: any) => {
    let token = await signJWT({ email: queryKey[1] })
    let req = await fetchJson({ uri: '/api/v1/backend/get-list', method: 'POST', authToken: token })
    if (req.status != 200) return { ok: false };
    let json = await req.json()
    return {
        ok: true,
        limit: json.data.limit,
        available: json.data.available,
        canMake: json.data.canMake,
        all: json.data.list.sort((a: any, b: any) => Number(a.createdAt) - Number(b.createdAt)).reverse(),
        list: groupBy(json.data.list, 'category')
    }
}

export const fetchAnalytics = async ({ queryKey }: any) => {
    let token = await signJWT({ email: queryKey[1] })
    let req = await fetchJson({ uri: '/api/v1/backend/get-analytics', method: 'POST', authToken: token })
    if (req.status != 200) return { ok: false };
    let json = await req.json()
    return {
        ok: true,
        ...json.data.total
    }
}

export const fetchKounterPut = async (query: any) => {
    let token = await signJWT(query)
    let req = await fetchJson({ uri: '/api/v1/backend/put', method: 'POST', authToken: token })
    if (req.status != 200) return { ok: false };
    return true;
}

export const fetchKounterReset = async (query: any) => {
    let token = await signJWT(query)
    let req = await fetchJson({ uri: '/api/v1/backend/reset', method: 'POST', authToken: token })
    if (req.status != 200) return { ok: false };
    return true;
}

export const fetchKounterAdd = async (query: any) => {
    let token = await signJWT(query)
    let req = await fetchJson({ uri: '/api/v1/backend/add', method: 'POST', authToken: token })
    if (req.status != 200) return { ok: false };
    return true;
}

export const fetchKounterDel = async (query: any) => {
    let token = await signJWT(query)
    let req = await fetchJson({ uri: '/api/v1/backend/del', method: 'POST', authToken: token })
    if (req.status != 200) return { ok: false };
    return true;
}

export const fetchVisits = async (type: any) => {
    if (type == 'main') {
        await fetchJson({ uri: process.env.NEXT_PUBLIC_VAPI_MAIN, method: 'GET' })
    } else if (type == 'dash') {
        await fetchJson({ uri: process.env.NEXT_PUBLIC_VAPI_DASH, method: 'GET' })
    } else if (type == 'list') {
        await fetchJson({ uri: process.env.NEXT_PUBLIC_VAPI_LIST, method: 'GET' })
    } else if (type == 'profile') {
        await fetchJson({ uri: process.env.NEXT_PUBLIC_VAPI_PROFILE, method: 'GET' })
    } else if (type == 'premium') {
        await fetchJson({ uri: process.env.NEXT_PUBLIC_VAPI_PREMIUM, method: 'GET' })
    } else if (type == 'docs') {
        await fetchJson({ uri: process.env.NEXT_PUBLIC_VAPI_DOCS, method: 'GET' })
    }
    return true;
}