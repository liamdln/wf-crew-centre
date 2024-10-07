import {Card, CardHeader, CardTitle} from "@/components/ui/card";
import {getUser} from "@/lib/database/users";
import {auth} from "@/auth";
import ProfileSidebar from "@/components/profile-sidebar";

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

    const session = await auth()

    return (
        <div className={"flex gap-6 h-full"}>
            <ProfileSidebar isCurrentUser={user.id === session?.user.id}
                            initialUserData={user}
            />
            <Card className={"grow"}>
                <CardHeader>
                    <CardTitle>Sectors</CardTitle>
                </CardHeader>
            </Card>
        </div>

    )

}

export default ProfilePage;