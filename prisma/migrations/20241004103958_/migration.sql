/*
  Warnings:

  - The values [Member,Crew,Admin] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Role_new" AS ENUM ('member', 'crew', 'admin');
ALTER TABLE "UserRoles" ALTER COLUMN "role" TYPE "Role_new" USING ("role"::text::"Role_new");
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "Role_old";
COMMIT;

-- CreateTable
CREATE TABLE "Airport" (
    "id" SERIAL NOT NULL,
    "icao_code" CHAR(4),
    "iata_code" CHAR(3),
    "name" VARCHAR(50),
    "city" VARCHAR(50),
    "country" VARCHAR(50),
    "lat_deg" INTEGER,
    "lat_min" INTEGER,
    "lat_sec" INTEGER,
    "lat_dir" CHAR(1),
    "lon_deg" INTEGER,
    "lon_min" INTEGER,
    "lon_sec" INTEGER,
    "lon_dir" CHAR(1),
    "altitude" INTEGER,
    "lat_deciman" DOUBLE PRECISION,
    "lon_decimal" DOUBLE PRECISION,

    CONSTRAINT "Airport_pkey" PRIMARY KEY ("id")
);
