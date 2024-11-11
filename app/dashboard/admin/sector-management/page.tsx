import {Separator} from "@/components/ui/separator";
import SectorTable from "@/components/dialog-forms/sector/sector-table";
import {getSectors} from "@/lib/database/sectors";
import {getAllUsers} from "@/lib/database/users";
import {mapIdsToNames} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import {SectorForm} from "@/components/dialog-forms/sector";

async function SectorManagement() {

    const sectors = await getSectors();
    const users = await getAllUsers()
    const userIdNameMap = await mapIdsToNames(users)

    return (
        <div>
            <div className={"mb-3"}>
                <h1 className={"text-4xl font-bold mb-1"}>Sector Management</h1>
                <Separator/>
            </div>
            <SectorForm airports={[]} users={[]}>
                <Button>New Sector</Button>
            </SectorForm>
            <SectorTable sectors={sectors} userIdNameMap={userIdNameMap}/>
        </div>
    )

}

export default SectorManagement;