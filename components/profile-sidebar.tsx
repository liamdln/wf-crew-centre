"use client";

import {Card, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import Image from "next/image";
import {capitaliseFirstLetter, isAdmin} from "@/lib/utils";
import {User} from "next-auth";
import EditProfile from "@/components/dialog-forms/edit-profile/edit-profile";
import {EditIcon} from "lucide-react";
import {useContext, useEffect, useState} from "react";
import {UserContext} from "@/context/users";
import LoadingSkeleton from "@/components/loading-skeleton";

type Props = {
    initialUserData: User
    isCurrentUser: boolean;
}

function ProfileSidebar({isCurrentUser, initialUserData}: Props) {

    const { filterUsersById } = useContext(UserContext)

    const [user, setUser] = useState(initialUserData)

    useEffect(() => {
        const user = filterUsersById(initialUserData.id ?? "0") ?? initialUserData
        setUser(user)
    }, [filterUsersById, initialUserData])


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
                    <p className={"text-muted-foreground mt-6"}>{user.bio === "" ? <em>No biography...</em> : user.bio}</p>
                </div>
                <EditProfile user={user}
                             hidden={isCurrentUser && !isAdmin(user)}
                             isCurrentUser={isCurrentUser}
                >
                    <EditIcon className={"w-4 h-4 me-2"}/>
                    Edit Profile
                </EditProfile>
            </CardHeader>
        </Card>
    )

}

export default ProfileSidebar;