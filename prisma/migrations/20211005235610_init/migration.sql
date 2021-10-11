/*
  Warnings:

  - Added the required column `photographer` to the `Photo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Photo" ADD COLUMN     "photographer" VARCHAR(255) NOT NULL;
