/* eslint-disable no-param-reassign */
import { Prisma } from ".prisma/client";

import prisma from "@/lib/prisma";
import { ShowPatchArgs, ShowPutData, SortedShows } from "@/lib/shows/types";
import { sortShows } from "@/lib/shows/utils";

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

  return prisma.show.update({ data: updatedData, where: { id } });
};

export const deleteShow = async (id: number) => {
  await prisma.show.delete({ where: { id } });
};

export const getSortedShows = async (): Promise<SortedShows> => {
  const shows = await getShows();

  return sortShows(shows);
};
