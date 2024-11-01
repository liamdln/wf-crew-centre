/*
  Warnings:

  - Made the column `icao_code` on table `Airport` required. This step will fail if there are existing NULL values in that column.
  - Made the column `iata_code` on table `Airport` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `Airport` required. This step will fail if there are existing NULL values in that column.
  - Made the column `city` on table `Airport` required. This step will fail if there are existing NULL values in that column.
  - Made the column `country` on table `Airport` required. This step will fail if there are existing NULL values in that column.
  - Made the column `altitude` on table `Airport` required. This step will fail if there are existing NULL values in that column.
  - Made the column `lat_deciman` on table `Airport` required. This step will fail if there are existing NULL values in that column.
  - Made the column `lon_decimal` on table `Airport` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Airport" ALTER COLUMN "icao_code" SET NOT NULL,
ALTER COLUMN "iata_code" SET NOT NULL,
ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "name" SET DATA TYPE TEXT,
ALTER COLUMN "city" SET NOT NULL,
ALTER COLUMN "city" SET DATA TYPE TEXT,
ALTER COLUMN "country" SET NOT NULL,
ALTER COLUMN "country" SET DATA TYPE TEXT,
ALTER COLUMN "altitude" SET NOT NULL,
ALTER COLUMN "lat_deciman" SET NOT NULL,
ALTER COLUMN "lon_decimal" SET NOT NULL;
