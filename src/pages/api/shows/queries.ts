/* eslint-disable no-param-reassign */
import { Prisma } from ".prisma/client";

import prisma from "@/lib/prisma";

export type VenueData = {
  name: string;
  url?: string;
};

type NewOrExistingVenue = {
  venueId?: number;
  venueData?: VenueData;
};

export type ShowPutData = { performAt: Date } & NewOrExistingVenue;

export type ShowPatchData = {
  body: ShowPutData;
  id: number;
};

const generateVenueData = ({ venueId, venueData }: NewOrExistingVenue) =>
  // connect to venue if id was provided; otherwise create a new one
  venueId ? { connect: { id: venueId } } : { create: venueData };

export const getShows = () =>
  prisma.show.findMany({
    orderBy: { performAt: "desc" },
    include: { venue: true },
  });
const getShowById = (id: number) => prisma.show.findUnique({ where: { id } });

export const addShow = ({ performAt, venueId, venueData }: ShowPutData) => {
  if (!venueId && !venueData) {
    throw new Error("Either venueId or venueData must be provided");
  }

  const venue = generateVenueData({ venueId, venueData });
  const data: Prisma.ShowCreateInput = { performAt, venue };

  return prisma.show.create({ data });
};

export const patchShow = async ({ body, id }: ShowPatchData) => {
  const showData = getShowById(id);
  if (!showData) {
    throw new Error(`Bad show id: ${id}`);
  }

  // get the venueId and venueData from the body
  const { venueId, venueData } = body;
  delete body.venueId;
  delete body.venueData;

  // add venue in proper format to updatedData
  const updatedData: Prisma.ShowUpdateInput = { ...body };
  updatedData.venue = generateVenueData({ venueId, venueData });

  prisma.show.update({ data: updatedData, where: { id } });
};

export const deleteShow = async (id: number) => {
  prisma.show.delete({ where: { id } });
};
