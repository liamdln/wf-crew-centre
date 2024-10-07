import UserTable from "@/components/user-table";
import {auth} from "@/auth";
import {getAllRoleAssignments} from "@/lib/database/users";
import {Separator} from "@/components/ui/separator";

async function UserManagementPage() {

    const session = await auth()
    if (!session?.user) return null

    const roleAssignments = await getAllRoleAssignments()

    return (
        <div>
            <div className={"mb-3"}>
                <h1 className={"text-4xl font-bold mb-1"}>User Management</h1>
                <Separator/>
            </div>
            <UserTable currentUser={session?.user} roleAssignments={roleAssignments} />
        </div>
    )
}

export default UserManagementPage;