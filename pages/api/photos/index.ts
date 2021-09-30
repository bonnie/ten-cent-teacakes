import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'


export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const musicians = await prisma.photo.findMany({ orderBy: [{ event: { performAt: 'asc'}}] })
  res.json(musicians)
}