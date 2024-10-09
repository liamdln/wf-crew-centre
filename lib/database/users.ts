import {prisma} from "@/prisma";
import {Role} from "@prisma/client";
import {User} from "next-auth";

async function getAllUsers() {
    const allUsers = await prisma.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            image: true,
            bio: true
        }
    });
    const roles = await getAllRoleAssignments()

    const users = []

    for (const user of allUsers) {
        users.push({
            role: roles[user.id],
            ...user
        })
    }

    return users;

}

async function getUser(userId: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
        select: {
            id: true,
            name: true,
            email: true,
            image: true,
            bio: true
        },
        where: {
            id: userId
        }
    });
    if (!user) { return null }
    const role = await getUserRole(user.id)

    return {
        role: role ?? "member",
        ...user
    }
}

async function getAllRoleAssignments() {
    const res = await prisma.userRoles.findMany();

    const assignments: Record<string, Role> = {}
    for (const assignment of res) {
        assignments[assignment.userId] = assignment.role
    }

    return assignments
}

async function getUserRole(userId: string): Promise<Role> {
    const role = await prisma.userRoles.findUnique({where: { userId }})
    if (!role) return "member"
    return role.role
}

export { getAllUsers, getAllRoleAssignments, getUser, getUserRole };