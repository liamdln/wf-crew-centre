"use server";

import {Sector} from "@prisma/client";
import {auth} from "@/auth";
import {isAdmin} from "@/lib/utils";
import {upsertSector} from "@/lib/database/sectors";
import {revalidatePath} from "next/cache";

export async function handleSectorFormSubmit(sector: Sector) {

    const session = await auth()
    if (!isAdmin(session?.user)) throw new Error("Unauthorised action.")

    await upsertSector(sector)
    revalidatePath("/dashboard/admin/sector-management")

}