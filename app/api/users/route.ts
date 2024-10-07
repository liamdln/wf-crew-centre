import { type NextRequest } from 'next/server'
import {auth} from "@/auth";
import {isAdmin, isCrew} from "@/lib/utils";
import {prisma} from "@/prisma";
import {getAllUsers, getUser} from "@/lib/database/users";

export async function GET(request: NextRequest) {

    const session = await auth()
    if (!session) return Response.json({message: "You need to be logged in to access this resource."}, { status: 401 })
    if (!isAdmin(session.user) && !isCrew(session.user)) {
        return Response.json({message: "You are not authorised to access this resource."}, { status: 403 })
    }

    const searchParams = request.nextUrl.searchParams
    const id = searchParams.get("id")

    if (!id) {
        const allUsers = await getAllUsers()
        return Response.json(allUsers)
    }

    const user = await getUser(id)

    if (!user) {
        return Response.json({ message: `User with ID ${id} not found.` }, { status: 404 })
    }
    return Response.json(user)

}

export async function PATCH(request: NextRequest) {

    const session = await auth()
    if (!session) return Response.json({message: "You need to be logged in to access this resource."}, { status: 401 })
    if (!isAdmin(session.user)) {
        return Response.json({message: "You are not authorised to access this resource."}, { status: 403 })
    }

    const searchParams = request.nextUrl.searchParams
    const id = searchParams.get("id")
    if (!id) return Response.json({message: "You need to specify a user ID."}, { status: 400 })

    let data = null;
    try {
        data = await request.json()
        if (!validUserPatchData(data)) return Response.json({message: "Malformed body sent."}, { status: 400 })
    } catch (e) {
        console.error(e)
        return Response.json({message: "Malformed body sent."}, { status: 400 })
    }

    let updatedUser, updatedRole = null

    try {

        updatedUser = await prisma.user.update({
            where: {id},
            data: {
                name: data.name,
                bio: data.bio,
            }
        })

        if (id !== session.user.id) {
            updatedRole = await prisma.userRoles.update({
                where: {userId: id},
                data: {
                    role: data.role
                }
            })
        } else {
            updatedRole = { message: "Not allowed to change own role. Action was ignored and role remains unchanged." }
        }

    } catch (e) {
        console.error(e)
    }

    if (!updatedUser || !updatedRole) {
        return Response.json({message: "The specified user could not be found."}, { status: 404 })
    }

    return Response.json({ message: "success" });

}

function validUserPatchData(body: Record<string, string>) {
    return body.name &&
        body.role
}
