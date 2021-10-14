/*
  Warnings:

  - You are about to drop the column `eventId` on the `Photo` table. All the data in the column will be lost.
  - You are about to drop the `Event` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `showId` to the `Photo` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_venueId_fkey";

-- DropForeignKey
ALTER TABLE "Photo" DROP CONSTRAINT "Photo_eventId_fkey";

-- AlterTable
ALTER TABLE "Photo" DROP COLUMN "eventId",
ADD COLUMN     "showId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Event";

-- CreateTable
CREATE TABLE "Show" (
    "id" SERIAL NOT NULL,
    "performAt" TIMESTAMP(3) NOT NULL,
    "venueId" INTEGER NOT NULL,

    CONSTRAINT "Show_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Show" ADD CONSTRAINT "Show_venueId_fkey" FOREIGN KEY ("venueId") REFERENCES "Venue"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Photo" ADD CONSTRAINT "Photo_showId_fkey" FOREIGN KEY ("showId") REFERENCES "Show"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
