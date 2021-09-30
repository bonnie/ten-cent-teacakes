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
      name: "Sarah Grondquist",
      bio: "Check cat door for ambush 10 times before coming in hiss at vacuum cleaner. Hide head under blanket so no one can see. Cat mojo . Lick master's hand at first then bite because im moody",
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
      name: "Bonnie Schulkin",
      bio: "Fish i must find my red catnip fishy fish kick up litter or mouse or meow jump five feet high and sideways when a shadow moves. Fooled again thinking the dog likes me",
      instruments: {
        connect: [
          { name: "bass" },
          { name: "kazoo" },
          { name: "vocals" },
        ],
      },
      imagePath: "/musicians/bonnie.jpg",
    },
    {
      name: "Greg Urban",
      bio: "Play with twist ties plan steps for world domination. That box? i can fit in that box claw drapes. Bite the neighbor's bratty kid warm up laptop with butt",
      instruments: {
        connect: [
          { name: "fiddle" },
          { name: "vocals" },
        ],
      },
      imagePath: "/musicians/greg.jpg",
    },
  ];
  for (const musician of musicianData) {
    console.log(`\tcreating musician ${musician.name}`);
    prisma.musician.create({ data: musician });
  }
};

async function main() {
  console.log(`Start seeding ...`);
  await createInstruments();
  await createMusicians();
  console.log(`Seeding finished.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
