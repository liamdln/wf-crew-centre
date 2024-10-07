import {type ClassValue, clsx} from "clsx"
import {twMerge} from "tailwind-merge"
import {User} from "next-auth";

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