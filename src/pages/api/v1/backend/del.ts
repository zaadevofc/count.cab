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

        const session: any = await getServerSession(req, res, Nextauth)
        if (!session) return res.status(401).send(parseReqSend(401))

        const token = req.headers['authorization'];
        if (!token) return res.status(401).send(parseReqSend(401))

        let parse = await verifyJWT(token.split('ZDAuth ')[1])
        if (!parse) return res.status(401).send(parseReqSend(401))
    
        let del = await prisma.kounter.delete({
            where: { id: parse.id }
        })

        if (del) return res.status(200).send(parseReqSend(200, del))
        return res.status(404).send(parseReqSend(404))
    } catch (e) {
        console.log(e);
        return res.status(500).send(parseReqSend(500))
    }
}
