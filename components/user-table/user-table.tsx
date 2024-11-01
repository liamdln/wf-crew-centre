"use client";

import {Input} from "@/components/ui/input";
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Button} from "@/components/ui/button";
import {EditIcon, TrashIcon} from "lucide-react";
import {User} from "next-auth";
import {useState} from "react";
import {capitaliseFirstLetter, isAdmin} from "@/lib/utils";
import EditProfile from "@/components/dialog-forms/edit-profile/edit-profile";
import Link from "next/link";
import {Role} from "@prisma/client";
import {DeleteUser} from "@/components/dialog-forms/delete-user";

type Props = {
    currentUser: User;
    allUsers: User[];
    userRoleMap: Record<string, string>;
}

function UserTable({currentUser, allUsers, userRoleMap}: Props) {

    const [searchTerm, setSearchTerm] = useState("")

    const applySearchTerm = () => {
        return allUsers.filter(user =>
            user.id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email?.toLowerCase().includes(searchTerm.toLowerCase())
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

                                let role = (userRoleMap[user.id ?? ""] ?? "")
                                if (!role) role = "member"

                                return (
                                    <TableRow key={user.id}>
                                        <TableCell className="font-medium">
                                            <Link href={`/dashboard/profile?id=${user.id}`} className={"underline"}>{user.id}</Link>
                                        </TableCell>
                                        <TableCell>{user.name}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell className={"w-1/5"}>{capitaliseFirstLetter(role)}</TableCell>
                                        <TableCell className="flex justify-end gap-3 w-full">
                                            <EditProfile user={user}
                                                         hidden={currentUser.id === user.id && !isAdmin(currentUser)}
                                                         isCurrentUser={currentUser.id === user.id}
                                                         size={"icon"}
                                            >
                                                <EditIcon className={"w-4 h-4"}/>
                                            </EditProfile>
                                            <DeleteUser user={user}>
                                                <Button
                                                    size={"icon"}
                                                    variant={"destructive"}
                                                >
                                                    <TrashIcon className={"w-4 h-4"}/>
                                                </Button>
                                            </DeleteUser>
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