import prisma from "@/lib/prisma";

type VenuePutData = { name: string; url?: string };

type VenuePatchData = {
  body: VenuePutData;
  id: number;
};

export const getVenues = () =>
  prisma.venue.findMany({
    orderBy: { name: "asc" },
  });

const getVenueById = (id: number) => prisma.venue.findUnique({ where: { id } });

export const addVenue = (data: VenuePutData) => prisma.venue.create({ data });

export const patchVenue = async ({ body, id }: VenuePatchData) => {
  const venueData = getVenueById(id);
  if (!venueData) {
    throw new Error(`Bad venue id: ${id}`);
  }

  prisma.venue.update({ data: body, where: { id } });
};

export const deleteVenue = async (id: number) => {
  prisma.venue.delete({ where: { id } });
};
