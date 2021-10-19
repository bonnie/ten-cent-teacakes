/* eslint-disable no-await-in-loop */
/* eslint-disable no-console */
/* eslint-disable guard-for-in */
/* eslint-disable camelcase */
/* eslint-disable no-restricted-syntax */
// adapted from https://github.com/prisma/prisma-examples/blob/latest/typescript/rest-nextjs-api-routes/prisma/seed.ts

import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createInstruments = async () => {
  const instrumentNames = [
    "guitar",
    "baritone ukulele",
    "vocals",
    "bass",
    "kazoo",
    "fiddle",
  ];
  for (const name of instrumentNames) {
    const existingInstrument = await prisma.instrument.findUnique({
      where: { name },
    });
    if (!existingInstrument) {
      const result = await prisma.instrument.create({ data: { name } });
      console.log(`\tcreated instrument ${result.name}`);
    } else {
      console.log(`\tskipping ${name}... already exists`);
    }
  }
};

const createMusicians = async () => {
  const musicianData: Prisma.MusicianCreateInput[] = [
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
      imagePath: "/musicians/sarah.jpg",
    },
    {
      firstName: "Bonnie",
      lastName: "Schulkin",
      bio: "Bonnie's musical past includes an elementary school chorus solo in \"76 Trombones\" (and it's pretty much downhill from there). Bass is her ideal instrument: it's heavy on theory and light on actual number of notes to be played.",
      instruments: {
        connect: [{ name: "bass" }, { name: "kazoo" }, { name: "vocals" }],
      },
      imagePath: "/musicians/bonnie.jpg",
    },
    {
      firstName: "Greg",
      lastName: "Urban",
      bio: "In what is perhaps an excess of caution, Greg is peaking late, rather than too early. He enthusiastically plays an eclectic mix of swing, Hank Williams, Celtic, and old-time fiddle. He also bakes teacakes.",
      instruments: {
        connect: [{ name: "fiddle" }, { name: "vocals" }],
      },
      imagePath: "/musicians/greg.jpg",
    },
  ];
  for (const musician of musicianData) {
    const existingMusician = await prisma.musician.findFirst({
      where: { firstName: musician.firstName, lastName: musician.lastName },
    });
    if (existingMusician) {
      const result = await prisma.musician.update({
        where: { id: existingMusician.id },
        data: musician,
      });
      console.log(`\tupdated musician ${result.firstName}`);
    } else {
      const result = await prisma.musician.create({ data: musician });
      console.log(`\tcreated musician ${result.firstName}`);
    }
  }
};

async function main() {
  console.log("Start seeding ...");
  await createInstruments();
  await createMusicians();
  console.log("Seeding finished.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
