/* eslint-disable no-param-reassign */
import { Prisma } from ".prisma/client";

import prisma from "@/lib/prisma";

export type ShowPutData = { performAt: Date; venueId: number };

export type ShowPatchData = {
  body: ShowPutData;
  id: number;
};

// const generateVenueData = ({ venueId, venueData }: NewOrExistingVenue) =>
//   // connect to venue if id was provided; otherwise create a new one
//   venueId ? { connect: { id: venueId } } : { create: venueData };

export const getShows = () =>
  prisma.show.findMany({
    orderBy: { performAt: "desc" },
    include: { venue: true },
  });

const getShowById = (id: number) => prisma.show.findUnique({ where: { id } });

export const addShow = ({ performAt, venueId }: ShowPutData) => {
  const data: Prisma.ShowCreateInput = {
    performAt,
    venue: { connect: { id: venueId } },
  };
  return prisma.show.create({ data });
};

export const patchShow = async ({ body, id }: ShowPatchData) => {
  const showData = getShowById(id);
  if (!showData) {
    throw new Error(`Bad show id: ${id}`);
  }

  // add venue in proper format to updatedData
  const updatedData: Prisma.ShowUpdateInput = {
    performAt: body.performAt,
    venue: { connect: { id: body.venueId } },
  };
  prisma.show.update({ data: updatedData, where: { id } });
};

export const deleteShow = async (id: number) => {
  prisma.show.delete({ where: { id } });
};
