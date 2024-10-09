/*
  Warnings:

  - You are about to drop the column `lat_deg` on the `Airport` table. All the data in the column will be lost.
  - You are about to drop the column `lat_dir` on the `Airport` table. All the data in the column will be lost.
  - You are about to drop the column `lat_min` on the `Airport` table. All the data in the column will be lost.
  - You are about to drop the column `lat_sec` on the `Airport` table. All the data in the column will be lost.
  - You are about to drop the column `lon_deg` on the `Airport` table. All the data in the column will be lost.
  - You are about to drop the column `lon_dir` on the `Airport` table. All the data in the column will be lost.
  - You are about to drop the column `lon_min` on the `Airport` table. All the data in the column will be lost.
  - You are about to drop the column `lon_sec` on the `Airport` table. All the data in the column will be lost.
  - Made the column `pic_id` on table `Sector` required. This step will fail if there are existing NULL values in that column.
  - Made the column `fo_id` on table `Sector` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Sector" DROP CONSTRAINT "Sector_fo_id_fkey";

-- DropForeignKey
ALTER TABLE "Sector" DROP CONSTRAINT "Sector_pic_id_fkey";

-- AlterTable
ALTER TABLE "Airport" DROP COLUMN "lat_deg",
DROP COLUMN "lat_dir",
DROP COLUMN "lat_min",
DROP COLUMN "lat_sec",
DROP COLUMN "lon_deg",
DROP COLUMN "lon_dir",
DROP COLUMN "lon_min",
DROP COLUMN "lon_sec";

-- AlterTable
ALTER TABLE "Sector" ALTER COLUMN "pic_id" SET NOT NULL,
ALTER COLUMN "fo_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Sector" ADD CONSTRAINT "Sector_fo_id_fkey" FOREIGN KEY ("fo_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sector" ADD CONSTRAINT "Sector_pic_id_fkey" FOREIGN KEY ("pic_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
