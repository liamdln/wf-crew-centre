"use client";

import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import moment from 'moment/min/moment-with-locales';
import SectorModal from "@/components/sector-modal/sector-modal";
import React, {useContext, useEffect, useState} from "react";
import LoadingSkeleton from "@/components/loading-skeleton";
import {Button} from "@/components/ui/button";
import {EditIcon, TrashIcon} from "lucide-react";
import {SectorContext} from "@/context/sectors";
import {User} from "next-auth";
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel,
    AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog";

function SectorTable() {

    const { sectors, sectorsBusy, deleteSector, reorderSectors } = useContext(SectorContext)
    const [users, setUsers] = useState<Record<string, string>>({})

    useEffect(() => {
        fetchUsers()
    }, [])

    const fetchUsers = () => {
        fetch("/api/users")
            .then(res => {
                if (!res.ok) throw new Error(res.statusText)
                return res.json()
            })
            .then((data: User[]) => {
                const filteredUsers: Record<string, string> = {}
                data.forEach(user => {
                    if (user.id) filteredUsers[user.id] = user?.name ?? "Unknown"
                })
                setUsers(filteredUsers)
            })
            .catch(err => {
                console.error(err)
            })
    }

    return (
        <>
            <div className={"mb-6"}>
                <SectorModal>
                    <Button>New Sector</Button>
                </SectorModal>
            </div>
            {


                sectorsBusy
                    ?
                    <LoadingSkeleton />
                    :
                    sectors.length < 1
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
                                        sectors.map(sector => (
                                            <TableRow key={sector.id}>
                                                <TableCell>{sector.id}</TableCell>
                                                <TableCell>{sector.fromIcao}</TableCell>
                                                <TableCell>{sector.toIcao}</TableCell>
                                                <TableCell className={"max-w-32 overflow-x-scroll"}>{sector.route.toUpperCase()}</TableCell>
                                                <TableCell>{ sector?.picId ? users[sector.picId] : "Unknown" }</TableCell>
                                                <TableCell>{ sector?.foId ? users[sector.foId] : "Unknown" }</TableCell>
                                                <TableCell>{moment(sector.departureTime).locale("en-gb").format("LT")}</TableCell>
                                                <TableCell>{moment(sector.arrivalTime).locale("en-gb").format("LT")}</TableCell>
                                                <TableCell className={"flex gap-3 justify-end"}>
                                                    <SectorModal sector={sector}>
                                                        <Button size={"icon"}>
                                                            <EditIcon className={"w-4 h-4"}/>
                                                        </Button>
                                                    </SectorModal>
                                                    <AlertDialog>
                                                        <AlertDialogTrigger asChild>
                                                            <Button size={"icon"} variant={"destructive"}>
                                                                <TrashIcon className={"w-4 h-4"}/>
                                                            </Button>
                                                        </AlertDialogTrigger>
                                                        <AlertDialogContent>
                                                            <AlertDialogHeader>
                                                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                                                <AlertDialogDescription>
                                                                    This action cannot be undone. This will permanently
                                                                    delete the selected sector:
                                                                    <Table className={"mt-3"}>
                                                                        <TableRow>
                                                                            <TableHead>ID</TableHead>
                                                                            <TableHead>Origin</TableHead>
                                                                            <TableHead>Destination</TableHead>
                                                                        </TableRow>
                                                                        <TableRow>
                                                                            <TableCell>{ sector.id }</TableCell>
                                                                            <TableCell>{ sector.fromIcao }</TableCell>
                                                                            <TableCell>{ sector.toIcao }</TableCell>
                                                                        </TableRow>
                                                                    </Table>
                                                                </AlertDialogDescription>
                                                            </AlertDialogHeader>
                                                            <AlertDialogFooter>
                                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                                <AlertDialogAction onClick={() => deleteSector(sector.id)}>Continue</AlertDialogAction>
                                                            </AlertDialogFooter>
                                                        </AlertDialogContent>
                                                    </AlertDialog>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    }
                                </TableBody>
                            </Table>
                        </div>
            }
            <div className={"mt-3"}>
                <Button variant={"outline"} onClick={reorderSectors}>Refresh Order</Button>
            </div>
        </>
    )

}

export default SectorTable;