-- CreateTable
CREATE TABLE "Sector" (
    "id" TEXT NOT NULL,
    "from_icao" TEXT NOT NULL,
    "from_name" TEXT NOT NULL,
    "to_icao" TEXT NOT NULL,
    "to_name" TEXT NOT NULL,
    "route" TEXT NOT NULL,
    "pic_id" TEXT,
    "fo_id" TEXT,
    "departure_time" TIMESTAMP(3) NOT NULL,
    "arrival_time" TIMESTAMP(3) NOT NULL,
    "block_time" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Sector_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Sector_pic_id_key" ON "Sector"("pic_id");

-- CreateIndex
CREATE UNIQUE INDEX "Sector_fo_id_key" ON "Sector"("fo_id");

-- AddForeignKey
ALTER TABLE "Sector" ADD CONSTRAINT "Sector_pic_id_fkey" FOREIGN KEY ("pic_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sector" ADD CONSTRAINT "Sector_fo_id_fkey" FOREIGN KEY ("fo_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
