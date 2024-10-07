import {Separator} from "@/components/ui/separator";
import NewSector from "@/components/new-sector";

function SectorManagement() {

    return (
        <div>
            <div className={"mb-3"}>
                <h1 className={"text-4xl font-bold mb-1"}>Sector Management</h1>
                <Separator/>
            </div>
            <div>
                <NewSector />
            </div>
        </div>
    )

}

export default SectorManagement;