"use client";

import {Input} from "@/components/ui/input";
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Button} from "@/components/ui/button";
import {CheckIcon, EditIcon, TrashIcon} from "lucide-react";
import {useState} from "react";
import UserTableDropdown from "@/components/user-table/user-table-dropdown";
import {User} from "next-auth";
import {roles} from "@/lib/database/roles";
import {Role} from "@prisma/client";

type Props = {
    currentUser: { role: string } & User;
    allUsers: User[];
    roleAssignments: Record<string, Role>;
}

function capitaliseFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function UserTable({currentUser, allUsers, roleAssignments}: Props) {

    const [isEditing, setIsEditing] = useState(false);

    const updateUserRole = (userId: string, newRole: string) => {
        const role = capitaliseFirstLetter(newRole) as Role;

        console.log(userId)
        console.log(role)
    }

    return (
        <div>
            <Input className={"w-1/8 float-right mb-2"} placeholder={"Search..."}/>
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
                        allUsers.map((user) => {

                            let role = (roleAssignments[user.id ?? ""] ?? "").toLowerCase()
                            if (!role) role = "member"

                            return (
                                <TableRow key={user.id}>
                                    <TableCell className="font-medium">{user.id}</TableCell>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell className={"w-1/5"}>{
                                        isEditing
                                            ? <UserTableDropdown items={roles}
                                                                 userId={user.id ?? ""}
                                                                 selectedItem={role}
                                                                 setSelectedItem={updateUserRole}/>
                                            : <span>{capitaliseFirstLetter(role)}</span>
                                    }
                                    </TableCell>
                                    <TableCell className="flex justify-end gap-3 w-full">
                                        {
                                            isEditing
                                                ?
                                                <Button
                                                    onClick={() => setIsEditing(false)}
                                                    size={"icon"}
                                                    variant={"default"}
                                                    disabled={currentUser.id === user.id}
                                                >
                                                    <CheckIcon className={"w-4 h-4"}/>
                                                </Button>
                                                :
                                                <Button
                                                    onClick={() => setIsEditing(true)}
                                                    size={"icon"}
                                                    variant={"default"}
                                                    disabled={currentUser.id === user.id}
                                                >
                                                    <EditIcon className={"w-4 h-4"}/>
                                                </Button>
                                        }
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

export default UserTable