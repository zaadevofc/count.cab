import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { groupBy } from '~/consts';
import prisma from '~/prisma';
import Nextauth from '../auth/[...nextauth]';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const session = await getServerSession(req, res, Nextauth)
        if (!session) return res.status(401).send('UNAUTHORIZED')

        let { email } = req.query;
        if (!email) return res.status(401).send('UNAUTHORIZED')

        let find = await prisma.user.findUnique({
            where: {
                email: email as string
            },
            include: { kounter: true }
        })

        let data = {
            category: ['ALL CONTENTS', ...Object.keys(groupBy(find?.kounter as any, 'category'))],
            list: {
                'ALL CONTENTS': find?.kounter,
                ...groupBy(find?.kounter as any, 'category')
            }
        }

        if (find) return res.status(200).send({ ok: true, data })
        return res.status(404).send('NOT FOUND')
    } catch (e) {
        return res.status(500).send('FAILED')
    }
}
