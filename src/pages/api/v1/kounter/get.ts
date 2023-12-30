import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '~/prisma';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        let { id, apikey }: any = req.query
        let find = await prisma.kounter.findUnique({
            where: { id }
        })
        if (find?.visibility == 'PRIVATE' && apikey?.[0] !== find?.apikey) return res.status(401).send('UNAUTHORIZED')
        if (find?.status == 'OFFLINE') return res.status(403).send({ status: 'disabled', off: true });

        if (find) return res.status(200).send({
            count: Number(find.count),
            click: Number(find.click),
        })
        return res.status(404).send('NOT FOUND')
    } catch (e) {
        console.log(e)
        return res.status(500).send('FAILED')
    }
}
