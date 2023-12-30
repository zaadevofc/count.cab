import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { verifyJWT } from '~/consts';
import prisma from '~/prisma';
import Nextauth from '../../auth/[...nextauth]';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const session: any = await getServerSession(req, res, Nextauth)
        if (!session) return res.status(401).send('UNAUTHORIZED')

        let { token } = req.query;
        if (!token) return res.status(401).send('UNAUTHORIZED')

        let parse = await verifyJWT(token)
        if (!parse) return res.status(401).send('UNAUTHORIZED')
    
        let put = await prisma.kounter.update({
            data: { 
                visibility: parse.visibility,
                status: parse.status,
                apikey: parse.apikey,
             },
            where: { id: parse.id }
        })
        
        if (put) return res.status(200).send('OK')
        return res.status(500).send('FAILED')
    } catch (e) {
        console.log(e);
        return res.status(500).send('FAILED')
    }
}
