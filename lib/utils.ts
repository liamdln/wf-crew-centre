import {type ClassValue, clsx} from "clsx"
import {twMerge} from "tailwind-merge"
import {User} from "next-auth";
import {getAllUsers} from "@/lib/database/users";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function isAdmin(user: User | null | undefined) {
    if (!user) return false;
    return user.role === "admin"
}

export function isCrew(user: User | null | undefined) {
    if (!user) return false;
    return user.role === "crew"
}

export function capitaliseFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export async function mapUserRoles (users?: User[]) {

    if (!users) {
        users = await getAllUsers()
    }

    const mappedUsers: Record<string, string> = {}
    users.forEach((user: User) => {
        if (user.id) mappedUsers[user.id] = user?.role ?? "member"
    })
    return mappedUsers
}