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

        if (!find) return res.status(404).send('NOT FOUND');
        if (find?.visibility == 'PRIVATE' && apikey?.[0] !== find?.apikey) return res.status(401).send('UNAUTHORIZED')
        if (find?.status == 'OFFLINE') return res.status(403).send({ status: 'disabled', off: true });

        let hit = await prisma.$queryRaw`
            UPDATE "Kounter"
            SET count = ${Number(find.count) + 1}, click = ${Number(find.click) + 1}
            WHERE id = ${id}
        `
        if (!hit) return res.status(500).send('FAILED');

        if (find) return res.status(200).send({
            count: Number(find.count) + 1,
            click: Number(find.click) + 1,
        })
        return res.status(500).send('FAILED')
    } catch (e) {
        console.log(e);
        return res.status(500).send('FAILED')
    }
}
