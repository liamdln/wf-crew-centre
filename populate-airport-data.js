const readline = require("readline")
const fs = require("fs")


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
    for (const line of lines) {
        const airportDetails = line.split(":")
        airports.push({
            icao: airportDetails[0],
            iata: airportDetails[1],
            name: airportDetails[2],
            city: airportDetails[3],
            country: airportDetails[4],
            altitude: airportDetails[13],
            longitude: airportDetails[14],
            latitude: airportDetails[15],
        })
    }

    return airports

}

function readFile() {
    rl.question("Enter airport data file location (absolute path): ", (answer) => {
        getFileFromFS(answer)
        rl.close()
    })

}

async function insertIntoDb(airports) {

    

}

readFile()