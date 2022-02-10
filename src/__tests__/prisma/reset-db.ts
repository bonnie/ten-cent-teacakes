/* eslint-disable no-await-in-loop */
/* eslint-disable no-console */
/* eslint-disable guard-for-in */
/* eslint-disable camelcase */
/* eslint-disable no-restricted-syntax */
// adapted from https://github.com/prisma/prisma-examples/blob/latest/typescript/rest-nextjs-api-routes/prisma/seed.ts

import { PrismaClient } from "@prisma/client";

import dayjs from "dayjs";

const prismaClient = new PrismaClient();

export const yesterday = dayjs().subtract(1, "day").toDate();
export const tomorrow = dayjs().add(1, "day").toDate();
export const nextMonth = dayjs().add(1, "month").toDate();

const deleteAll = async () => {
  await prismaClient.musician.deleteMany({});
  await prismaClient.instrument.deleteMany({});
  await prismaClient.show.deleteMany({});
  await prismaClient.venue.deleteMany({});
};

const createVenues = async () => {
  const venueData = [
    {
      name: "Venue 1",
      url: "http://venue1.com",
    },
    {
      name: "Venue 2",
    },
  ];
  await prismaClient.venue.createMany({ data: venueData });
};

const createShows = async () => {
  const venue1 = await prismaClient.venue.findUnique({
    where: { name: "Venue 1" },
  });
  const venue2 = await prismaClient.venue.findUnique({
    where: { name: "Venue 2" },
  });
  if (!venue1 || !venue2) {
    throw new Error("Could not find venue(s) in seeded db.");
  }
  const showData = [
    {
      performAt: yesterday,
      venueId: venue1.id,
    },
    {
      performAt: tomorrow,
      url: `${venue1.url}/show2`,
      venueId: venue1.id,
    },
    {
      performAt: nextMonth,
      venueId: venue2.id,
    },
  ];
  await prismaClient.show.createMany({ data: showData });
};

const createInstruments = async () => {
  const instrumentNames = [
    "guitar",
    "baritone ukulele",
    "vocals",
    "bass",
    "kazoo",
    "fiddle",
  ];
  await prismaClient.instrument.createMany({
    data: instrumentNames.map((name) => ({ name })),
  });
};

const createMusicians = async () => {
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

  // createMany doesn't allow the { instruments: { connect } } syntax
  // await prismaClient.musician.createMany({ data: musicianData });
  for (const musician of musicianData) {
    await prismaClient.musician.create({ data: musician });
  }
};

export const resetDB = async () => {
  try {
    await deleteAll();
    await createInstruments();
    await createMusicians();
    await createVenues();
    await createShows();
  } catch (error) {
    console.error("Failed to seed DB");
    console.error(error);
    process.exit(1);
  } finally {
    await prismaClient.$disconnect();
  }
};
