/*
  Warnings:

  - A unique constraint covering the columns `[url]` on the table `Venue` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Venue_url_key" ON "Venue"("url");
