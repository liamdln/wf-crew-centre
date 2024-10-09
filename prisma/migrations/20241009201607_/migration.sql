/*
  Warnings:

  - A unique constraint covering the columns `[icao_code]` on the table `Airport` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[iata_code]` on the table `Airport` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Airport_icao_code_key" ON "Airport"("icao_code");

-- CreateIndex
CREATE UNIQUE INDEX "Airport_iata_code_key" ON "Airport"("iata_code");
