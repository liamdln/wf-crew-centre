"use server";

import {Sector} from "@prisma/client";
import {auth} from "@/auth";
import {isAdmin} from "@/lib/utils";
import {deleteSector} from "@/lib/database/sectors";
import {revalidatePath} from "next/cache";

export async function handleDeleteSector(sector: Sector) {

    const session = await auth()
    if (!isAdmin(session?.user)) throw new Error("Unauthorised");

    await deleteSector(sector.id)
    revalidatePath("/dashboard/admin/sector-management")

}