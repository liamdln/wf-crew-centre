import {prisma} from "@/prisma";
import {Sector} from "@prisma/client";

async function getSectors(): Promise<Sector[]> {

    return prisma.sector.findMany({
        orderBy: [{id: "asc"}]
    });

}

async function getSector(id: number): Promise<Sector | null> {

    return prisma.sector.findUnique({
        where: {id},
    });

}

async function getSectorByTrip(departureIcao: string, arrivalIcao: string) {

    return prisma.sector.findUnique({
        where: {
            tripId: {
                fromIcao: departureIcao,
                toIcao: arrivalIcao
            }
        }
    });

}

async function getSectorsByUser(userId: string): Promise<Sector[]> {
    return prisma.sector.findMany({
        where: {
            OR: [
                {
                    picId: {equals: userId}
                },
                {
                    foId: {equals: userId}
                }
            ]
        }
    })
}

async function createSector(sector: Sector): Promise<Sector> {

    // validate
    if (!validateSectorData(sector)) throw new Error("Invalid sector data was sent.")

    return prisma.sector.create({
        data: sector
    })

}

async function updateSector(sectorId: number, sector: Sector): Promise<Sector> {

    // validate
    if (!validateSectorData(sector)) throw new Error("Invalid sector data was sent.")

    return prisma.sector.update({
        where: {id: sectorId},
        data: sector
    })

}

async function upsertSector(sector: Sector): Promise<Sector> {

    if (!validateSectorData(sector)) throw new Error("Invalid sector data was sent.")

    return prisma.sector.upsert({
        where: {id: sector.id},
        update: sector,
        create: sector
    })

}

async function deleteSector(sectorId: number): Promise<Sector> {

    return prisma.sector.delete({
        where: {id: sectorId}
    })

}

function validateSectorData(sector: Sector): boolean {
    if (!sector.id ||
        !sector.fromIcao ||
        !sector.toIcao ||
        !sector.route ||
        !sector.picId ||
        !sector.foId ||
        !sector.departureTime ||
        !sector.arrivalTime ||
        !sector.blockTime
    ) return false

    return sector.picId !== sector.foId;

}

export {
    getSectors,
    getSectorByTrip,
    getSector,
    createSector,
    updateSector,
    validateSectorData,
    deleteSector,
    getSectorsByUser,
    upsertSector
}