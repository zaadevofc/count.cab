import { fetchAPi, signJWT } from "~/consts";

type AddKounter = {
    type: 'ADD';
    id?: string;
    title: string;
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
            id: `${Math.random().toString(36).substring(2, 30)}`,
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
    } else if (config.type == 'DEL') {
        let token = await signJWT({ id: config.queryKey[1] })
        let res = await fetchAPi(`/api/v1/get?token=${token}`, 'text')
        return res == 'OK';
    }
}