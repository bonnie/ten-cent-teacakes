/*
  Warnings:

  - Added the required column `bio` to the `Musician` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Musician" ADD COLUMN     "bio" TEXT NOT NULL;
