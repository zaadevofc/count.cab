import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { parseReqSend, verifyJWT } from '~/consts';
import prisma from '~/prisma';
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

        let find = await prisma.user.findUnique({
            where: {
                email: parse.email as string
            },
            include: { kounter: true }
        })

        let data = {
            limit: Number(find?.limit) - Number(find?.kounter.length),
            canMake: Number(find?.kounter.length) < Number(find?.limit),
            list: find?.kounter
        }

        if (find) return res.status(200).send(parseReqSend(200, data))
        return res.status(404).send(parseReqSend(404))
    } catch (e) {
        console.log(e);
        return res.status(500).send(parseReqSend(500))
    }
}
