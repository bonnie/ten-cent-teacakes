/*
  Warnings:

  - A unique constraint covering the columns `[url]` on the table `Show` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Show" ADD COLUMN     "url" VARCHAR(255);

-- CreateIndex
CREATE UNIQUE INDEX "Show_url_key" ON "Show"("url");
