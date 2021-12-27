/* eslint-disable no-param-reassign */
import { Prisma } from ".prisma/client";

import prisma from "@/lib/prisma";
import { ShowPatchArgs, ShowPutData } from "@/lib/shows";

// const generateVenueData = ({ venueId, venueData }: NewOrExistingVenue) =>
//   // connect to venue if id was provided; otherwise create a new one
//   venueId ? { connect: { id: venueId } } : { create: venueData };

export const getShows = () =>
  prisma.show.findMany({
    orderBy: { performAt: "desc" },
    include: { venue: true },
  });

const getShowById = (id: number) => prisma.show.findUnique({ where: { id } });

export const addShow = ({ performAt, venueId, url }: ShowPutData) => {
  const data: Prisma.ShowCreateInput = {
    performAt,
    url,
    venue: { connect: { id: Number(venueId) } },
  };
  return prisma.show.create({ data });
};

export const patchShow = async ({ data, id }: ShowPatchArgs) => {
  const showData = getShowById(id);
  if (!showData) {
    throw new Error(`Bad show id: ${id}`);
  }

  // add venue in proper format to updatedData
  const updatedData: Prisma.ShowUpdateInput = {
    performAt: data.performAt,
    venue: { connect: { id: Number(data.venueId) } },
    url: data.url,
  };
  await prisma.show.update({ data: updatedData, where: { id } });
};

export const deleteShow = async (id: number) => {
  await prisma.show.delete({ where: { id } });
};
