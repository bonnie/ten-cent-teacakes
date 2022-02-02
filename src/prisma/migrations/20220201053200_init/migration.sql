/*
  Warnings:

  - You are about to drop the column `imagePixelHeight` on the `Musician` table. All the data in the column will be lost.
  - You are about to drop the column `imagePixelWidth` on the `Musician` table. All the data in the column will be lost.
  - You are about to drop the column `pixelHeight` on the `Photo` table. All the data in the column will be lost.
  - You are about to drop the column `pixelWidth` on the `Photo` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Musician" DROP COLUMN "imagePixelHeight",
DROP COLUMN "imagePixelWidth";

-- AlterTable
ALTER TABLE "Photo" DROP COLUMN "pixelHeight",
DROP COLUMN "pixelWidth";
