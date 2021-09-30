/*
  Warnings:

  - You are about to drop the column `name` on the `Musician` table. All the data in the column will be lost.
  - Added the required column `firstName` to the `Musician` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `Musician` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Musician_name_key";

-- AlterTable
ALTER TABLE "Musician" DROP COLUMN "name",
ADD COLUMN     "firstName" VARCHAR(255) NOT NULL,
ADD COLUMN     "lastName" VARCHAR(255) NOT NULL;
