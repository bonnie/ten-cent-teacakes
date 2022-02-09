/* eslint-disable no-await-in-loop */
/* eslint-disable no-console */
/* eslint-disable guard-for-in */
/* eslint-disable camelcase */
/* eslint-disable no-restricted-syntax */
// adapted from https://github.com/prisma/prisma-examples/blob/latest/typescript/rest-nextjs-api-routes/prisma/seed.ts

import { PrismaClient } from "@prisma/client";

import dayjs from "dayjs";

const yesterday = dayjs().subtract(1, "day").toDate();
const tomorrow = dayjs().add(1, "day").toDate();

const createVenues = async (prismaClient: PrismaClient) => {
  const venueData = [
    {
      name: "Venue 1",
      url: "http://venue1.com",
    },
    {
      name: "Venue 2",
    },
  ];

  prismaClient.venue.createMany({ data: venueData });
};

const createShows = async (prismaClient: PrismaClient) => {
  const venue1 = await prismaClient.venue.findUnique({
    where: { name: "Venue 1" },
  });
  const venue2 = await prismaClient.venue.findUnique({
    where: { name: "Venue 1" },
  });
  if (!venue1 || !venue2) {
    throw new Error("Could not find venue(s) in seeded db.");
  }
  const showData = [
    {
      name: "Show 1",
      performAt: yesterday,
      venueId: venue1.id,
    },
    {
      name: "Show 2",
      performAt: tomorrow,
      url: `${venue2.url}/show2`,
      venueId: venue2.id,
    },
  ];
  prismaClient.show.createMany({ data: showData });
};

const createInstruments = async (prismaClient: PrismaClient) => {
  const instrumentNames = [
    "guitar",
    "baritone ukulele",
    "vocals",
    "bass",
    "kazoo",
    "fiddle",
  ];
  prismaClient.instrument.createMany({
    data: instrumentNames.map((name) => ({ name })),
  });
};

const createMusicians = async (prismaClient: PrismaClient) => {
  const musicianData = [
    {
      firstName: "Sarah",
      lastName: "Gronquist",
      bio: "Music and dancing go hand in hand! Sarah's been dancing and playing swing guitar for the last decade, but during the quarantine of 2020, she started digging deeper into gypsy jazz and tango. She's usually got something from 1936 on her mind.",
      instruments: {
        connect: [
          { name: "guitar" },
          { name: "baritone ukulele" },
          { name: "vocals" },
        ],
      },
      imagePath: "musicians/sarah.jpg",
    },
    {
      firstName: "Bonnie",
      lastName: "Schulkin",
      bio: "Bonnie's musical past includes an elementary school chorus solo in \"76 Trombones\" and a slightly less glamorous stint in the Fly Right Sisters as an adult. Bass is her ideal instrument, as it's heavy on theory and light on actual number of notes required.",
      instruments: {
        connect: [{ name: "bass" }, { name: "kazoo" }, { name: "vocals" }],
      },
      imagePath: "musicians/bonnie.jpg",
    },
    {
      firstName: "Greg",
      lastName: "Urban",
      bio: "In what is perhaps an excess of caution, Greg is peaking late, rather than too early. He enthusiastically plays an eclectic mix of swing, Hank Williams, Celtic, and old-time fiddle. He also bakes teacakes.",
      instruments: {
        connect: [{ name: "fiddle" }, { name: "vocals" }],
      },
      imagePath: "musicians/greg.jpg",
    },
  ];
  prismaClient.musician.createMany({ data: musicianData });
};

export const seedDb = async (prismaClient: PrismaClient) => {
  try {
    await createInstruments(prismaClient);
    await createMusicians(prismaClient);
    await createVenues(prismaClient);
    await createShows(prismaClient);
  } catch (error) {
    console.error("Failed to seed DB");
    throw error;
  } finally {
    await prismaClient.$disconnect();
  }
};
