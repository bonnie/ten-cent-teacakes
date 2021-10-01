import prisma from "../../../lib/prisma";
import { Prisma } from ".prisma/client";

type VenueData = {
  name: string;
  url?: string;
};

type NewOrExistingVenue = {
  venueId?: number;
  venueData?: VenueData;
};

type EventPutData = { performAt: Date } & NewOrExistingVenue;

type EventPatchData = {
  body: { performAt: Date } & NewOrExistingVenue;
  id: number;
};

export const getEvents = () =>
  prisma.event.findMany({
    orderBy: { performAt: "desc" },
  });

export const addEvent = ({ performAt, venueId, venueData }: EventPutData) => {
  if (!venueId && !venueData) {
    throw new Error("Either venueId or venueData must be provided");
  }

  // connect to venue if id was provided; otherwise create a new one
  const venue = venueId ? { connect: { id: venueId } } : { create: venueData };
  const data: Prisma.EventCreateInput = { performAt, venue };

  return prisma.event.create({ data });
};

export const patchEvent = ({ body, id }: EventPatchData) => {};

export const deleteEvent = (id: number) => {};
