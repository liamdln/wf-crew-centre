import { type NextRequest } from 'next/server'
import {auth} from "@/auth";
import {isAdmin} from "@/lib/utils";
import {createSector, getSector, getSectors, validateSectorData} from "@/lib/database/sectors";

export async function GET(request: NextRequest) {

    const session = await auth()
    if (!session) return Response.json({message: "You need to be logged in to access this resource."}, { status: 401 })

    const searchParams = request.nextUrl.searchParams
    const id = searchParams.get("id")

    if (!id) {
        const allSectors = await getSectors()
        return Response.json(allSectors)
    }

    const sector = await getSector(id)

    if (!sector) {
        return Response.json({ message: `Sector with ID ${id} not found.` }, { status: 404 })
    }
    return Response.json(sector)

}

export async function PUT(request: NextRequest) {

    const session = await auth()
    if (!session) return Response.json({message: "You need to be logged in to access this resource."}, { status: 401 })
    if (!isAdmin(session.user)) {
        return Response.json({message: "You are not authorised to access this resource."}, { status: 403 })
    }

    let data = null;
    try {
        data = await request.json()
        if (!validateSectorData(data)) return Response.json({message: "Malformed body sent."}, { status: 400 })
    } catch (e) {
        console.error(e)
        return Response.json({message: "Malformed body sent."}, { status: 400 })
    }

    try {

        const newSector = await createSector(data)
        return Response.json(newSector)

    } catch (e) {
        console.error(e)
        return Response.json({message: "A server error occurred while creating the sector."}, { status: 500 })
    }

}

// export async function PATCH(request: NextRequest) {
//
// }
//
// export async function DELETE(request: NextRequest) {
//
// }

