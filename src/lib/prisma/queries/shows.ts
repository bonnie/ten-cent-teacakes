/* eslint-disable no-param-reassign */
import { Prisma } from ".prisma/client";

import prisma from "@/lib/prisma";
import { ShowPatchArgs, ShowPutData } from "@/lib/shows/types";

export const getShows = () =>
  prisma.show.findMany({
    orderBy: { performAt: "desc" },
    include: { venue: true },
  });

const getShowById = (id: number) => prisma.show.findUnique({ where: { id } });

export const addShow = ({ performAt, venueId, url }: ShowPutData) => {
  const data: Prisma.ShowCreateInput = {
    performAt,
    url: url ?? undefined,
    venue: { connect: { id: Number(venueId) } },
  };
  return prisma.show.create({ data });
};

export const patchShow = async ({ data, id }: ShowPatchArgs) => {
  const showData = await getShowById(id);
  if (!showData) {
    throw new Error(`Bad show id: ${id}`);
  }

  // add venue in proper format to updatedData
  const updatedData: Prisma.ShowUpdateInput = {
    performAt: data.performAt,
    venue: { connect: { id: Number(data.venueId ?? showData.venueId) } },
    url: data.url ?? undefined,
  };

  await prisma.show.update({ data: updatedData, where: { id } });
};

export const deleteShow = async (id: number) => {
  await prisma.show.delete({ where: { id } });
};
