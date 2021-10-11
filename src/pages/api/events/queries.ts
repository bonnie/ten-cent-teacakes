/* eslint-disable no-param-reassign */
import { Prisma } from ".prisma/client";

import prisma from "@/lib/prisma";

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
  body: EventPutData;
  id: number;
};

const generateVenueData = ({ venueId, venueData }: NewOrExistingVenue) =>
  // connect to venue if id was provided; otherwise create a new one
  venueId ? { connect: { id: venueId } } : { create: venueData };

export const getEvents = () =>
  prisma.event.findMany({
    orderBy: { performAt: "desc" },
  });
const getEventById = (id: number) => prisma.event.findUnique({ where: { id } });

export const addEvent = ({ performAt, venueId, venueData }: EventPutData) => {
  if (!venueId && !venueData) {
    throw new Error("Either venueId or venueData must be provided");
  }

  const venue = generateVenueData({ venueId, venueData });
  const data: Prisma.EventCreateInput = { performAt, venue };

  return prisma.event.create({ data });
};

export const patchEvent = async ({ body, id }: EventPatchData) => {
  const eventData = getEventById(id);
  if (!eventData) {
    throw new Error(`Bad event id: ${id}`);
  }

  // get the venueId and venueData from the body
  const { venueId, venueData } = body;
  delete body.venueId;
  delete body.venueData;

  // add venue in proper format to updatedData
  const updatedData: Prisma.EventUpdateInput = { ...body };
  updatedData.venue = generateVenueData({ venueId, venueData });

  prisma.event.update({ data: updatedData, where: { id } });
};

export const deleteEvent = async (id: number) => {
  prisma.event.delete({ where: { id } });
};
