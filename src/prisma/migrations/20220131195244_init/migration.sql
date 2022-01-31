/*
  Warnings:

  - Added the required column `imagePixelHeight` to the `Musician` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imagePixelWidth` to the `Musician` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pixelHeight` to the `Photo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pixelWidth` to the `Photo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Musician" ADD COLUMN     "imagePixelHeight" INTEGER NOT NULL,
ADD COLUMN     "imagePixelWidth" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Photo" ADD COLUMN     "pixelHeight" INTEGER NOT NULL,
ADD COLUMN     "pixelWidth" INTEGER NOT NULL;
