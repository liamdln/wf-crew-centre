"use client";

import {Card, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import Image from "next/image";
import {capitaliseFirstLetter, isAdmin} from "@/lib/utils";
import {User} from "next-auth";
import EditProfile from "@/components/edit-profile";

type Props = {
    user: {role: string} & User;
    isCurrentUser: boolean;
}

function ProfileSidebar({ user, isCurrentUser }: Props) {

    return (
        <Card className={"w-1/5 h-full"}>
            <CardHeader className={"h-full flex flex-col justify-between"}>
                <div>
                    <Image src={user.image ?? ""}
                           alt={user.name ?? "User's Profile"}
                           height={150}
                           width={150}
                           className={"mb-3"}
                    />
                    <CardTitle className={"overflow-x-scroll overflow-y-hidden py-1"}>{user.name}</CardTitle>
                    <CardDescription><em>{capitaliseFirstLetter(user.role)}</em></CardDescription>
                    <p className={"text-muted-foreground mt-6"}>{user.bio ?? <em>No bio...</em>}</p>
                </div>
                <EditProfile user={user}
                             hidden={isCurrentUser && !isAdmin(user)} />
            </CardHeader>
        </Card>
    )

}

export default ProfileSidebar;