import UserTable from "@/components/user-table/user-table";
import {auth} from "@/auth";
import {getAllUsers} from "@/lib/database/users";
import {Separator} from "@/components/ui/separator";
import {mapUserRoles} from "@/lib/utils";

async function UserManagementPage() {

    const session = await auth()
    if (!session?.user) return null

    const users = await getAllUsers()
    const userRoleMap = await mapUserRoles(users)

    return (
        <div>
            <div className={"mb-3"}>
                <h1 className={"text-4xl font-bold mb-1"}>User Management</h1>
                <Separator/>
            </div>
            <UserTable currentUser={session?.user} allUsers={users} userRoleMap={userRoleMap} />
        </div>
    )
}

export default UserManagementPage;