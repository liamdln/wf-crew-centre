import {Separator} from "@/components/ui/separator";
import SectorTable from "@/components/sector-table";
import {SectorProvider} from "@/context/sectors";
import {Button} from "@/components/ui/button";

async function SectorManagement() {

    return (
        <div>
            <div className={"mb-3"}>
                <h1 className={"text-4xl font-bold mb-1"}>Sector Management</h1>
                <Separator/>
            </div>
            <SectorProvider>
                <SectorTable />
            </SectorProvider>
        </div>
    )

}

export default SectorManagement;