import {Separator} from "@/components/ui/separator";
import {getSectors} from "@/lib/database/sectors";
import SectorCard from "@/components/sector-card";

async function Sectors() {

    const sectors = await getSectors()

    return (
        <div>
            <div className={"mb-3"}>
                <h1 className={"text-4xl font-bold mb-1"}>Sectors</h1>
                <Separator/>
            </div>
            <div className={"grid grid-cols-3 gap-6"}>
                {
                    sectors.map((sector) => (
                        <SectorCard key={sector.id} sector={sector} />
                    ))
                }
            </div>
        </div>
    )
}

export default Sectors