/*
  Warnings:

  - A unique constraint covering the columns `[from_icao,to_icao]` on the table `Sector` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Sector_from_icao_to_icao_key" ON "Sector"("from_icao", "to_icao");
