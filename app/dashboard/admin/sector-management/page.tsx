import {Separator} from "@/components/ui/separator";
import SectorTable from "@/components/sector-table";
import {getSectors} from "@/lib/database/sectors";
import {getAllUsers} from "@/lib/database/users";
import {User} from "next-auth";

function mapIdsToNames(users: User[]) {

    const map: Record<string, string> = {}
    for (const user of users) {
        if (!user.id) continue
        map[user.id] = user.name ?? "Unknown";
    }
    return map

}

async function SectorManagement() {

    const sectors = await getSectors();
    const users = await getAllUsers()
    const userIdNameMap = mapIdsToNames(users)

    return (
        <div>
            <div className={"mb-3"}>
                <h1 className={"text-4xl font-bold mb-1"}>Sector Management</h1>
                <Separator/>
            </div>
            <SectorTable sectors={sectors} userIdNameMap={userIdNameMap}/>
        </div>
    )

}

export default SectorManagement;