import {prisma} from "@/prisma";

async function getAirports() {
    return prisma.airport.findMany()
}

async function getAirportByIcao(icao: string) {
    return prisma.airport.findUnique({
        where: { icaoCode: icao }
    })
}

async function createAirport(airportDetails: string[]) {

    const icaoCode = airportDetails[0]
    const iataCode = airportDetails[1]
    const name = airportDetails[2]
    const city = airportDetails[3]
    const country = airportDetails[4]
    const altitude = +airportDetails[13]
    const longitude = +airportDetails[14]
    const latitude = +airportDetails[15]

    await prisma.airport.create({
        data: {
            icaoCode,
            iataCode,
            name,
            city,
            country,
            altitude,
            longitude,
            latitude
        }
    })

}

export { getAirports, getAirportByIcao }