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
    if (sector.picId === sector.foId) {
        throw new Error("Captain and First Officer cannot be the same user.")
    }



}

async function updateSector() {

}

export { getSectors, getSectorByTrip, getSector, createSector, updateSector }