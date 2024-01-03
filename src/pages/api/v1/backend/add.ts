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
        if (parse.limit == 0) return res.status(403).send(parseReqSend(403))
        delete parse.limit
    
        let create = await prisma.kounter.create({
            data: { ...parse, kounter: { connect: { email: session.user.email } } }
        })

        if (create) return res.status(200).send(parseReqSend(200, create))
        return res.status(404).send(parseReqSend(404))
    } catch (e) {
        console.log(e);
        return res.status(500).send(parseReqSend(500))
    }
}
