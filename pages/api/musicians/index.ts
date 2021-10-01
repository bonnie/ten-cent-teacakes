import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "../../../lib/prisma";

type MusicianPutData = {
  firstName: string;
  lastName: string;
  instrumentNames: Array<string>;
  bio: string;
  imagePath: string;
};

const getMusicians = () =>
  prisma.musician.findMany({
    orderBy: [{ lastName: "asc" }],
  });

const addMusician = ({
  firstName,
  lastName,
  instrumentNames,
  bio,
  imagePath,
}: MusicianPutData) => {
  const instruments = {
    connect: instrumentNames.map((name) => ({ name })),
  };

  return prisma.musician.create({
    data: {
      firstName,
      lastName,
      bio,
      imagePath,
      instruments,
    },
  });
};

// /api/musicians
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { body, method } = req;

  switch (method) {
    case "GET":
      res.json(await getMusicians());
      break;
    case "PUT":
      res.status(201).json(await addMusician(body));
      break;
    default:
      res.setHeader("Allow", ["GET", "PUT"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
