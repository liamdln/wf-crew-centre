-- DropForeignKey
ALTER TABLE "Sector" DROP CONSTRAINT "Sector_fo_id_fkey";

-- DropForeignKey
ALTER TABLE "Sector" DROP CONSTRAINT "Sector_pic_id_fkey";

-- AddForeignKey
ALTER TABLE "Sector" ADD CONSTRAINT "Sector_fo_id_fkey" FOREIGN KEY ("fo_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sector" ADD CONSTRAINT "Sector_pic_id_fkey" FOREIGN KEY ("pic_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
