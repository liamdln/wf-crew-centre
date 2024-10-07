/*
  Warnings:

  - You are about to drop the `Authenticator` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('MEMBER', 'CREW', 'ADMIN');

-- DropForeignKey
ALTER TABLE "Authenticator" DROP CONSTRAINT "Authenticator_userId_fkey";

-- DropTable
DROP TABLE "Authenticator";

-- CreateTable
CREATE TABLE "UserRoles" (
    "userId" TEXT NOT NULL,
    "role" "Role" NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "UserRoles_userId_key" ON "UserRoles"("userId");

-- AddForeignKey
ALTER TABLE "UserRoles" ADD CONSTRAINT "UserRoles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
