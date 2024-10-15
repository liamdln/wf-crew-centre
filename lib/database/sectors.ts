import {prisma} from "@/prisma";
import {Sector} from "@prisma/client";

async function getSectors() {

    return prisma.sector.findMany();

}

async function getSector(id: string) {

    return prisma.sector.findUnique({
        where: {id}
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

async function updateSector(sector: Sector) {

    // validate
    if (!validateSectorData(sector)) throw new Error("Invalid sector data was sent.")

    return prisma.sector.update({
        where: { id: sector.id },
        data: sector
    })

}

async function deleteSector(sectorId: string) {

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