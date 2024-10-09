const readline = require("readline")
const fs = require("fs")
const {PrismaClient} = require("@prisma/client");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function getFileFromFS(airportDataFile) {
    if (!airportDataFile) throw new Error("No file location was entered.")

    let airportData;
    try {
        airportData = fs.readFileSync(airportDataFile, "utf8")
    } catch (e) {
        console.error(e)
    }

    const lines = airportData.split("\n")
    const airports = []

    const knownIcaoCodes = []
    const knownIataCodes = []

    for (const line of lines) {
        const airportDetails = line.split(":")

        if (!airportDetails[0] || !airportDetails[1]) continue;
        if (knownIcaoCodes.includes(airportDetails[0]) || knownIataCodes.includes(airportDetails[1])) continue;

        airports.push({
            icaoCode: airportDetails[0],
            iataCode: airportDetails[1],
            name: airportDetails[2],
            city: airportDetails[3],
            country: airportDetails[4],
            altitude: +airportDetails[13],
            longitude: +airportDetails[14],
            latitude: +airportDetails[15],
        })

        knownIcaoCodes.push(airportDetails[0])
        knownIataCodes.push(airportDetails[1])

    }

    return airports

}

function readFile() {
    rl.question("Enter airport data file location (absolute path): ", (answer) => {
        const airports = getFileFromFS(answer)
        insertIntoDb(airports)
        rl.close()
    })

}

async function insertIntoDb(airports) {

    // const icaoCode = airports[0]
    // const iataCode = airports[1]
    // const name = airports[2]
    // const city = airports[3]
    // const country = airports[4]
    // const altitude = +airports[13]
    // const longitude = +airports[14]
    // const latitude = +airports[15]

    console.log(airports)

    console.log("Inserting airports...")

    const prisma = new PrismaClient()

    try {
        await prisma.airport.createMany({
            data: airports
        })
        console.log("Insert complete!")
    } catch (e) {
        console.error(e)
        console.log("Insert failed!")
    }


}

readFile()