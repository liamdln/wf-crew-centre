"use client";

import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import moment from 'moment/min/moment-with-locales';
import SectorModal from "@/components/sector-modal/sector-modal";
import {useState} from "react";
import {Button} from "@/components/ui/button";
import {EditIcon, TrashIcon} from "lucide-react";
import {Input} from "@/components/ui/input";
import {Sector} from "@prisma/client";
import {DeleteSector} from "@/components/dialog-forms/delete-sector";

type Props = {
    userIdNameMap: Record<string, string>;
    sectors: Sector[];
}

function SectorTable({userIdNameMap, sectors}: Props) {

    const [searchTerm, setSearchTerm] = useState("")

    const applySearchTerm = () => {
        return sectors.filter(sector =>
            `wf${sector.id}`.includes(searchTerm.toLowerCase()) ||
            sector.fromIcao.toLowerCase().includes(searchTerm.toLowerCase()) ||
            sector.toIcao.toLowerCase().includes(searchTerm.toLowerCase())
        )
    }

    return (
        <>
            <div className={"mb-6 flex justify-between"}>
                <SectorModal>
                    <Button>New Sector</Button>
                </SectorModal>
                <Input className={"w-1/8 float-right mb-2"}
                       placeholder={"Search..."}
                       value={searchTerm}
                       onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            {
                applySearchTerm().length < 1
                    ?
                    <div className={"text-center"}>
                        <em className={"text-muted-foreground"}>No sectors found.</em>
                    </div>
                    :
                    <div>

                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>ID</TableHead>
                                    <TableHead>Origin</TableHead>
                                    <TableHead>Destination</TableHead>
                                    <TableHead className={"max-w-32"}>Route</TableHead>
                                    <TableHead>Captain</TableHead>
                                    <TableHead>First Officer</TableHead>
                                    <TableHead>Departure Time</TableHead>
                                    <TableHead>Arrival Time</TableHead>
                                    <TableHead className={"text-end"}>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {
                                    applySearchTerm().map(sector => (
                                        <TableRow key={sector.id}>
                                            <TableCell>WF{sector.id}</TableCell>
                                            <TableCell>{sector.fromIcao}</TableCell>
                                            <TableCell>{sector.toIcao}</TableCell>
                                            <TableCell
                                                className={"max-w-32 overflow-x-scroll"}>{sector.route.toUpperCase()}</TableCell>
                                            <TableCell>{sector?.picId ? userIdNameMap[sector.picId] : "Unknown"}</TableCell>
                                            <TableCell>{sector?.foId ? userIdNameMap[sector.foId] : "Unknown"}</TableCell>
                                            <TableCell>{moment(sector.departureTime).locale("en-gb").format("LT")}</TableCell>
                                            <TableCell>{moment(sector.arrivalTime).locale("en-gb").format("LT")}</TableCell>
                                            <TableCell className={"flex gap-3 justify-end"}>
                                                <SectorModal sector={sector}>
                                                    <Button size={"icon"}>
                                                        <EditIcon className={"w-4 h-4"}/>
                                                    </Button>
                                                </SectorModal>
                                                <DeleteSector sector={sector}>
                                                    <Button size={"icon"} variant={"destructive"}>
                                                        <TrashIcon className={"w-4 h-4"}/>
                                                    </Button>
                                                </DeleteSector>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                    </div>
            }
        </>
    )

}

export default SectorTable;