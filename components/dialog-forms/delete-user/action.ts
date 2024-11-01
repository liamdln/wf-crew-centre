"use server";

import {auth} from "@/auth";
import {isAdmin} from "@/lib/utils";
import {deleteUser} from "@/lib/database/users";
import {User} from "next-auth";
import {revalidatePath} from "next/cache";

export async function handleDeleteUser(user: User) {

    const session = await auth()
    if (!isAdmin(session?.user)) throw new Error("Unauthorised");

    if (!user.id) throw new Error("Invalid user structure.")

    await deleteUser(user.id)
    revalidatePath("/dashboard/admin/user-management")

}