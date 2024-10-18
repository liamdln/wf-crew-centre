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
import NewSectorForm from "@/components/new-sector/form";
import {useEffect, useState} from "react";
import {User} from "next-auth";
import {toast} from "@/hooks/use-toast";
import {Airport} from "@prisma/client";

function NewSector() {

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

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>New Sector</Button>
            </DialogTrigger>
            <DialogContent className={"max-w-[75%]"} onInteractOutside={(e) => e.preventDefault()}>
                <DialogHeader>
                    <DialogTitle>New Sector</DialogTitle>
                    <DialogDescription>
                        Adds a new sector to the sector list.
                    </DialogDescription>
                </DialogHeader>
                <NewSectorForm users={users}
                               loadingUsers={loadingUsers}
                               airports={airports}
                               loadingAirports={loadingAirports}
                               setOpen={setOpen}
                />
            </DialogContent>
        </Dialog>

    )

}

export default NewSector