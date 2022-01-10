-- DropForeignKey
ALTER TABLE "Photo" DROP CONSTRAINT "Photo_showId_fkey";

-- AlterTable
ALTER TABLE "Photo" ALTER COLUMN "photographer" DROP NOT NULL,
ALTER COLUMN "showId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Photo" ADD CONSTRAINT "Photo_showId_fkey" FOREIGN KEY ("showId") REFERENCES "Show"("id") ON DELETE SET NULL ON UPDATE CASCADE;
