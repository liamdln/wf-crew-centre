"use server";

import {EditProfileFormData} from "./types";
import {auth} from "@/auth";
import {isAdmin} from "@/lib/utils";
import {User} from "next-auth";
import {updateUser} from "@/lib/database/users";
import {revalidatePath} from "next/cache";

export async function handleEditProfileSubmit(values: EditProfileFormData, user: User) {

    const session = await auth()

    // ensure there is a userId
    if (!user.id) throw new Error("Invalid user structure.")

    // don't allow people to edit each other, unless they're an admin
    if (!isAdmin(session?.user) && session?.user.id !== user.id) throw new Error("Not authorised.")
    // don't let anyone but admins edit a role.
    if (!isAdmin(session?.user)) values.role = user.role

    await updateUser(user.id, values)
    revalidatePath("/dashboard/profile")
    revalidatePath("/dashboard/admin/user-management")

}