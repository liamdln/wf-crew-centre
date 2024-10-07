import {prisma} from "@/prisma";
import {Role} from "@prisma/client";

async function getAllUsers() {
    return prisma.user.findMany();
}

async function getUser(userId: string) {
    return prisma.user.findUnique({where: {id: userId}});
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

// async function updateUserRole(caller: { role: string; } & User, targetId: string, newRole: Role) {
//
//     if (caller.id === targetId || !isAdmin(caller)) {
//         throw new Error("User is not authorised to perform this action.")
//     }
//     await prisma.userRoles.update({
//         where: { userId: targetId },
//         data: { role: newRole },
//     });
// }

export { getAllUsers, getAllRoleAssignments, getUser, getUserRole };