import {prisma} from "@/prisma";
import {Sector} from "@prisma/client";

async function getSectors() {

    return prisma.sector.findMany({
        orderBy: [{ id: "asc" }]
    });

}

async function getSector(id: number) {

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

async function createSector(sector: Sector) {

    // validate
    if (!validateSectorData(sector)) throw new Error("Invalid sector data was sent.")

    return prisma.sector.create({
        data: sector
    })

}

async function updateSector(sectorId: number, sector: Sector) {

    // validate
    if (!validateSectorData(sector)) throw new Error("Invalid sector data was sent.")

    console.log(sector)

    return prisma.sector.update({
        where: { id: sectorId },
        data: sector
    })

}

async function deleteSector(sectorId: number) {

    return prisma.sector.delete({
        where: {id: sectorId}
    })

}

function validateSectorData(sector: Sector) {
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

export { getSectors, getSectorByTrip, getSector, createSector, updateSector, validateSectorData, deleteSector }