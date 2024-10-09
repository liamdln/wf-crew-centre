import type {NextRequest} from "next/server";
import {auth} from "@/auth";
import {getAirportByIcao, getAirports} from "@/lib/database/airports";

export async function GET(request: NextRequest) {

    const session = await auth()
    if (!session) return Response.json({message: "You need to be logged in to access this resource."}, { status: 401 })

    const searchParams = request.nextUrl.searchParams
    const icao = searchParams.get("icao")

    if (!icao) {
        const allAirports = await getAirports()
        return Response.json(allAirports)
    }

    const airport = await getAirportByIcao(icao)

    if (!airport) {
        return Response.json({ message: `Airport with ICAO code ${icao} not found.` }, { status: 404 })
    }
    return Response.json(airport)

}