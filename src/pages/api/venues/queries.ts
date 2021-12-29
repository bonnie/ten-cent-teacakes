import prisma from "@/lib/prisma";
import { VenuePatchData, VenuePutData } from "@/lib/venues/types";

export const getVenues = () =>
  prisma.venue.findMany({
    orderBy: { name: "asc" },
  });

export const getVenueById = (id: number) =>
  prisma.venue.findUnique({ where: { id } });

export const addVenue = async (data: VenuePutData) => {
  await prisma.venue.create({
    data: { name: data.name, url: data.url ?? undefined },
  });
  return prisma.venue.findUnique({ where: { name: data.name } });
};

export const patchVenue = async ({ body, id }: VenuePatchData) => {
  const venueData = getVenueById(id);
  if (!venueData) {
    throw new Error(`Bad venue id: ${id}`);
  }

  await prisma.venue.update({ data: body, where: { id } });
};

export const deleteVenue = async (id: number) => {
  await prisma.venue.delete({ where: { id } });
};
