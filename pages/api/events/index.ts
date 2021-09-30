import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'


export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const musicians = await prisma.musician.findMany({ orderBy: [{ name: 'asc'}] })
  res.json(musicians)
}