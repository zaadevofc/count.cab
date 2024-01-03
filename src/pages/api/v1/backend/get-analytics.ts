import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { parseReqSend, verifyJWT } from '~/consts';
import Nextauth from '../../auth/[...nextauth]';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        if (req.method !== 'POST') return res.status(405).send(parseReqSend(405))

        const session = await getServerSession(req, res, Nextauth)
        if (!session) return res.status(401).send(parseReqSend(401))

        const token = req.headers['authorization'];
        if (!token) return res.status(401).send(parseReqSend(401))

        let parse = await verifyJWT(token.split('ZDAuth ')[1])
        if (!parse) return res.status(401).send(parseReqSend(401))
        console.log({ parse });

        let find = await prisma.user.findUnique({
            where: {
                email: parse.email as string
            },
            include: { kounter: true }
        })

        let data = {
            total: {
                list: find?.kounter.length,
                limit: find?.limit,
                online: find?.kounter.filter(x => x.status == 'ONLINE').length,
                count: find?.kounter.reduce((a, b) => Number(a) + Number(b.count), 0),
                click: find?.kounter.reduce((a, b) => Number(a) + Number(b.click), 0),
                top: find?.kounter.sort((a, b) => {
                    const selisihAngka = Number(b.count) - Number(a.count);
                    return selisihAngka !== 0 ? selisihAngka : Number(b.click) - Number(a.click);
                })
            }
        }

        if (find) return res.status(200).send(parseReqSend(200, data))
        return res.status(404).send(parseReqSend(404))
    } catch (e) {
        console.log(e);
        return res.status(500).send(parseReqSend(500))
    }
}