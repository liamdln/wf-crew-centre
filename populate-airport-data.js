const fs = require("fs")
const {PrismaClient} = require("@prisma/client");


async function run() {
    let airportData;
    try {
        airportData = fs.readFileSync("./airports.json", "utf8")
    } catch (e) {
        console.error(e)
    }

    airportData = JSON.parse(airportData)

    console.log("Inserting airports...")

    const data = []
    const knownIcaoCodes = []
    const knownIataCodes = []

    for (const airport of airportData) {

        if (!airport.iata_code || !airport.ident) continue;
        if (knownIataCodes.includes(airport.iata_code) || knownIcaoCodes.includes(airport.ident)) continue;
        if (airport.ident.length !== 4 || airport.iata_code.length !== 3) continue;

        data.push({
            icaoCode: airport.ident,
            iataCode: airport.iata_code,
            name: airport.name,
            city: airport.municipality,
            country: airport.iso_country,
            altitude: +airport.elevation_ft,
            latitude: +airport.latitude_deg,
            longitude: +airport.longitude_deg,
        })
        knownIataCodes.push(airport.iata_code)
        knownIcaoCodes.push(airport.ident)
    }

    const prisma = new PrismaClient()

    await prisma.airport.deleteMany()
    await prisma.airport.createMany({
        data
    })

}

run()
    .then(() => console.log("Done"))
    .catch(err => console.log(err))

// data from https://ourairports.com/data/