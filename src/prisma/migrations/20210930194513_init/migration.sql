/*
  Warnings:

  - You are about to drop the column `imgPath` on the `Musician` table. All the data in the column will be lost.
  - You are about to drop the column `path` on the `Photo` table. All the data in the column will be lost.
  - Added the required column `imagePath` to the `Musician` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imagePath` to the `Photo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Musician" DROP COLUMN "imgPath",
ADD COLUMN     "imagePath" VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE "Photo" DROP COLUMN "path",
ADD COLUMN     "imagePath" VARCHAR(255) NOT NULL;
