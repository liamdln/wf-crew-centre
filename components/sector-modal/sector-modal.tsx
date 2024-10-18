"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import NewSectorForm from "@/components/sector-modal/form";
import React, {useEffect, useState} from "react";
import {User} from "next-auth";
import {toast} from "@/hooks/use-toast";
import {Airport, Sector} from "@prisma/client";

type Props = {
    children: React.ReactNode
    sector?: Sector
}

function SectorModal({ children, sector }: Props) {

    const [users, setUsers] = useState<{ value: string, label: string }[]>([])
    const [loadingUsers, setLoadingUsers] = useState(true)

    const [airports, setAirports] = useState<{ value: string, label: string }[]>([])
    const [loadingAirports, setLoadingAirports] = useState(true)

    const [open, setOpen] = useState<boolean>(false)

    useEffect(() => {
        fetchUsers()
        fetchAirports()
    }, [])

    const fetchUsers = () => {
        setLoadingUsers(true)
        fetch("/api/users", {cache: "no-store"})
            .then(res => {
                if (!res.ok) throw new Error(`Could not fetch users: ${res.statusText}.`)
                return res.json()
            })
            .then(data => setUsers(data.map((user: User) => {
                return {value: user.id, label: user.name}
            })))
            .catch(err => {
                console.error(err)
                toast({
                    title: "An Error Occurred",
                    description: "Could not fetch the list of users.",
                    variant: "destructive"
                })
            })
            .finally(() => setLoadingUsers(false))
    }

    const fetchAirports = () => {
        setLoadingAirports(true)
        fetch("/api/airports", {next: { revalidate: 3600 }})
            .then(res => {
                if (!res.ok) throw new Error(`Could not fetch airports: ${res.statusText}.`)
                return res.json()
            })
            .then(data => setAirports(data.map((airport: Airport) => {
                return {value: airport.icaoCode, label: `${airport.icaoCode} - ${airport.name}`}
            })))
            .catch(err => {
                console.error(err)
                toast({
                    title: "An Error Occurred",
                    description: "Could not fetch the list of airports.",
                    variant: "destructive"
                })
            })
            .finally(() => setLoadingAirports(false))
    }

    const title = sector?.id ? "Edit Sector" : "New Sector"
    const description = sector?.id ? `Editing sector ${sector.id}.` : "Adds a new sector to the sector list."

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                { children }
            </DialogTrigger>
            <DialogContent className={"max-w-[75%]"} onInteractOutside={(e) => e.preventDefault()}>
                <DialogHeader>
                    <DialogTitle>{ title }</DialogTitle>
                    <DialogDescription>
                        { description }
                    </DialogDescription>
                </DialogHeader>
                <NewSectorForm users={users}
                               loadingUsers={loadingUsers}
                               airports={airports}
                               loadingAirports={loadingAirports}
                               setOpen={setOpen}
                               sector={sector}
                />
            </DialogContent>
        </Dialog>

    )

}

export default SectorModal