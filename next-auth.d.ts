import {Role} from "@prisma/client";
import {DefaultSession} from "@auth/core/types";
import {User as UserType} from "@auth/core/types"

declare module "next-auth" {
    interface Session {
        user: {
            role: Role
        } & DefaultSession["user"]
    }
    interface User extends UserType {
        bio: string | null;
        role: Role
    }
}