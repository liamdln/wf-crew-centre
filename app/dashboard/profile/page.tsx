import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {getUser} from "@/lib/database/users";
import {auth} from "@/auth";
import {getSectorsByUser} from "@/lib/database/sectors";
import SectorCard from "@/components/sector-card";
import Image from "next/image";
import {capitaliseFirstLetter, isAdmin} from "@/lib/utils";
import EditProfile from "@/components/dialog-forms/edit-profile/edit-profile";
import {EditIcon} from "lucide-react";

type Props = {
    searchParams: {
        id?: string;
    };
}

function ProfileNotFound() {
    return (
        <div className={"w-full flex justify-center"}>
            <em>Profile not found.</em>
        </div>
    )
}

async function ProfilePage({searchParams}: Props) {

    if (!searchParams.id) return ProfileNotFound()

    const user = await getUser(searchParams.id)
    if (!user) return ProfileNotFound();

    const sectors = await getSectorsByUser(user.id ?? "")
    const session = await auth()

    const isCurrentUser = () => session?.user.id === searchParams.id

    return (
        <div className={"flex gap-6 h-full max-h-svh"}>
            {/*<ProfileSidebar isCurrentUser={user.id === session?.user.id}*/}
            {/*                initialUserData={user}*/}
            {/*/>*/}
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
                                 hidden={isCurrentUser() && !isAdmin(user)}
                                 isCurrentUser={isCurrentUser()}
                    >
                        <EditIcon className={"w-4 h-4 me-2"}/>
                        Edit Profile
                    </EditProfile>
                </CardHeader>
            </Card>
            <Card className={"grow overflow-y-scroll"}>
                <CardHeader>
                    <CardTitle>Sectors</CardTitle>
                </CardHeader>
                <CardContent>
                    {
                        sectors.length < 1
                            ?
                            <em>No Sectors</em>
                            :
                            <div className={"grid grid-cols-3 gap-6"}>
                                {
                                    sectors.map(sector => (
                                        <SectorCard key={sector.id} sector={sector} className={"bg-background"} />
                                    ))
                                }
                            </div>
                    }
                </CardContent>
            </Card>
        </div>

    )

}

export default ProfilePage;