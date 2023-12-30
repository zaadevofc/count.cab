import { fetchAPi, signJWT } from "~/consts";

type AddKounter = {
    type: 'ADD';
    id?: string;
    title: string;
    currentLength: number;
    category: "WEBSITE" | "WORK" | "ORGANIZATION" | "COUNT" | "ADDITIONAL",
    apikey: string | undefined;
    visibility: "PUBLIC" | "PRIVATE",
    createdAt?: string;
}

type GetKounter = {
    type: 'GET';
    email: string
}

type DelKounter = {
    type: 'DEL';
    id: string
}

type KounterConfig = (AddKounter | GetKounter | DelKounter) & { queryKey?: any }

export const CRUD = async (config: KounterConfig) => {
    if (config.type == 'ADD') {
        config = {
            ...config,
            createdAt: `${new Date().getTime()}`,
        }
        let token = await signJWT(config, 10000)
        let res = await fetchAPi(`/api/v1/add?token=${token}`, 'text')
        return res == 'OK'
    } else if (config.type == 'GET' || config.queryKey[1] == 'GET') {
        let token = await signJWT({ email: config.queryKey[2] })
        let res = await fetchAPi(`/api/v1/get?token=${token}`, 'json')
        return res.data;
    }
}

export const dellll = async (id: any) => {
    let token = await signJWT({ id })
    let res = await fetchAPi(`/api/v1/del?token=${token}`, 'text')
    return res == 'OK';
}

export const putttt = async (config: any) => {
    let token = await signJWT(config)
    let res = await fetchAPi(`/api/v1/kounter/put?token=${token}`, 'text')
    return res == 'OK';
}