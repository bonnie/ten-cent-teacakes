import prisma from "@/lib/prisma";
import {
  VenuePatchData,
  VenuePutData,
  VenueWithShowCount,
} from "@/lib/venues/types";

export const getVenues = async (): Promise<Array<VenueWithShowCount>> => {
  const venues = await prisma.venue.findMany({
    orderBy: { name: "asc" },
    include: {
      _count: {
        select: { shows: true },
      },
    },
  });
  return venues.map((v) => ({
    id: v.id,
    name: v.name,
    url: v.url,
    // eslint-disable-next-line no-underscore-dangle
    showCount: v._count?.shows ?? 0,
  }));
};

export const getVenueById = async (id: number) =>
  prisma.venue.findUnique({ where: { id } });

export const addVenue = async (data: VenuePutData) => {
  await prisma.venue.create({
    data: { name: data.name, url: data.url ?? undefined },
  });
  return prisma.venue.findUnique({ where: { name: data.name } });
};

export const patchVenue = async ({ data, id }: VenuePatchData) => {
  const venueData = await getVenueById(id);
  if (!venueData) {
    throw new Error(`Bad venue id: ${id}`);
  }

  return prisma.venue.update({ data, where: { id } });
};

export const deleteVenue = async (id: number) => {
  await prisma.venue.delete({ where: { id } });
};
