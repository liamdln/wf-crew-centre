"use client";

import {Input} from "@/components/ui/input";
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import UserEdit from "@/components/edit-user";
import {Button} from "@/components/ui/button";
import {TrashIcon} from "lucide-react";
import {User} from "next-auth";
import {useEffect, useState} from "react";
import {toast} from "@/hooks/use-toast";
import LoadingSkeleton from "@/components/loading-skeleton";
import {capitaliseFirstLetter} from "@/lib/utils";

type Props = {
    currentUser: User;
    roleAssignments: Record<string, string>;
}

function UserTable({currentUser, roleAssignments}: Props) {

    const [allUsers, setAllUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [userRoles, setUserRoles] = useState<Record<string, string>>(roleAssignments)
    const [searchTerm, setSearchTerm] = useState("")

    useEffect(() => {
        refreshUsers()
    }, [])

    const refreshUsers = () => {
        setLoading(true)
        fetch("/api/users", {cache: "no-store"})
            .then(res => {
                if (!res.ok) throw Error(res.statusText)
                return res.json()
            })
            .then(data => setAllUsers(data))
            .catch(err => {
                console.error(err)
                toast({
                    title: "An Error Occurred",
                    description: "Could not download the list of users.",
                    variant: "destructive"
                })
            })
            .finally(() => setLoading(false));
    }

    const updateUser = async (userId: string, name: string, role: string) => {
        const body = {
            name,
            role
        }

        return fetch(`/api/users?id=${userId}`, {
            method: "PATCH",
            body: JSON.stringify(body)
        })
            .then((res) => {
                if (!res.ok) throw Error(res.statusText);
                refreshUsers()
                setUserRoles(old => {
                    return {...old, [userId]: role}
                })
            })
            .catch(err => {
                console.error(err)
                toast({
                    title: "An Error Occurred",
                    description: "Could not update the selected user.",
                    variant: "destructive"
                })
            })
    }

    const applySearchTerm = () => {
        return allUsers.filter(user =>
            user.id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email?.toLowerCase().includes(searchTerm.toLowerCase())
        )
    }

    if (loading) {
        return (
            <div>
                <LoadingSkeleton/>
            </div>
        )
    }

    return (
        <div>
            <Input className={"w-1/8 float-right mb-2"}
                   placeholder={"Search..."}
                   value={searchTerm}
                   onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Table>
                <TableCaption className={"italic"}>Data on this table contains sensitive member data.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        applySearchTerm().length < 1
                            ?
                            <TableCell colSpan={5} className={"p-3 text-center"}>
                                <em>No users found.</em>
                            </TableCell>
                            :
                            applySearchTerm().map((user) => {

                                let role = (userRoles[user.id ?? ""] ?? "")
                                if (!role) role = "member"

                                return (
                                    <TableRow key={user.id}>
                                        <TableCell className="font-medium">{user.id}</TableCell>
                                        <TableCell>{user.name}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell className={"w-1/5"}>{capitaliseFirstLetter(role)}</TableCell>
                                        <TableCell className="flex justify-end gap-3 w-full">
                                            <UserEdit
                                                user={{role, ...user}}
                                                updateUser={updateUser}
                                                editingCurrentUser={user.id === currentUser.id}
                                            />
                                            <Button
                                                size={"icon"}
                                                variant={"destructive"}
                                                disabled={currentUser.id === user.id}
                                            >
                                                <TrashIcon className={"w-4 h-4"}/>
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                )
                            })
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default UserTable;