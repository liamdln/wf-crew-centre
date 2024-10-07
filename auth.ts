import NextAuth from "next-auth";
import Discord from "@auth/core/providers/discord";
import {PrismaAdapter} from "@auth/prisma-adapter";
import {prisma} from "@/prisma";
import {Role} from "@prisma/client";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [Discord],
    adapter: PrismaAdapter(prisma),
    callbacks: {
        async signIn ({profile}) {
            const username = profile?.username;
            console.log(username)
            return true
        },
        async session({ session, user }) {
            session.user.role = await getRoleForUser(user.id)
            return session
        }
    }
})

async function getRoleForUser(userId: string): Promise<Role> {
    const res = await prisma.userRoles.findFirst({
        select: { role: true },
        where: {
            userId: userId,
        }
    })

    // they don't have a role
    if (!res) {
        // inset member role
        await prisma.userRoles.create({
            data: {
                userId: userId,
                role: "member"
            }
        })

        // return member
        return "member"
    }

    return res.role
}