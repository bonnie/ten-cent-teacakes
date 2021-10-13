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
    console.log(`\tcreating instrument ${name}`);
    prisma.instrument.create({ data: { name } });
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
      bio: "Bonnie loves vocal harmony and playing the bass. Vocal harmony is rewarding and beautiful, and bassists only have to play a few notes per measure (but can still call themselves instrumentalists!).",
      instruments: {
        connect: [{ name: "bass" }, { name: "kazoo" }, { name: "vocals" }],
      },
      imagePath: "/musicians/bonnie.jpg",
    },
    {
      firstName: "Greg",
      lastName: "Urban",
      bio: "Greg has been fiddling for about 10 years now, with genre interests ranging from Scottish folk to Hank Williams to gypsy swing. His dream is to be compared to Stephan Grapelli (hopefully favorably).",
      instruments: {
        connect: [{ name: "fiddle" }, { name: "vocals" }],
      },
      imagePath: "/musicians/greg.jpg",
    },
  ];
  for (const musician of musicianData) {
    console.log(`\tcreating musician ${musician.firstName}`);
    prisma.musician.create({ data: musician });
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
