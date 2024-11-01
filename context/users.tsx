"use client";

import React, {createContext, useEffect, useState} from "react";
import {toast} from "@/hooks/use-toast";
import {User} from "next-auth";
import {Role} from "@prisma/client";

type Props = {
    children: React.ReactNode;
}

type ContextType = {
    users: User[];
    usersBusy: boolean;
    userRoleMap: Record<string, string>
    filterUsersById: (id: string) => User | null
    getUsers: () => Promise<User[]>;
    getUserById: (id: string) => Promise<User>;
    updateUser: (userId: string, body: { name: string, role: string, bio: string | null }) => Promise<User>;
    deleteUser: (id: string) => Promise<User>;
}

const initialContext: ContextType = {
    users: [],
    usersBusy: true,
    userRoleMap: {},
    filterUsersById: () => null,
    getUsers: () => Promise.resolve([]),
    getUserById: () => Promise.resolve({} as User),
    updateUser: () => Promise.resolve({} as User),
    deleteUser: () => Promise.resolve({} as User)
}

const UserContext = createContext(initialContext)

function UserProvider({children}: Props) {

    const [users, setUsers] = useState<User[]>(initialContext.users)
    const [usersBusy, setUsersBusy] = useState(initialContext.usersBusy)
    const [userRoleMap, setUserRoleMap] = useState<Record<string, string>>(initialContext.userRoleMap)

    useEffect(() => {
        getUsers()
            .then((users: User[]) => {
                setUsers(users)
                mapUserRoles(users)
            })
            .catch(err => {
                console.error(err);
                toast({
                    title: "An Error Occurred",
                    description: "Could not fetch sectors.",
                    variant: "destructive"
                });
                setUsers([])
            })
    }, []);

    const getUsers = async () => {
        setUsersBusy(true)
        return fetch("/api/users", {cache: "no-store"})
            .then(res => {
                if (!res.ok) throw new Error(`Could not refresh users: ${res.statusText}`)
                return res.json()
            })
            .then((data: User[]) => data)
            .finally(() => setUsersBusy(false));
    }

    const getUserById = async (id: string) => {
        return fetch(`/api/users?id=${id}`, {cache: "no-store"})
            .then(res => {
                if (!res.ok) throw new Error(`Could not refresh users: ${res.statusText}`)
                return res.json()
            })
            .then((data: User) => data)
    }

    async function updateUser(userId: string, body: { name: string, role: string, bio: string | null }) {
        setUsersBusy(true)
        return fetch(`/api/users?id=${userId}`, {
            method: "PATCH",
            body: JSON.stringify(body)
        })
            .then((res) => {
                if (!res.ok) throw new Error(`Could not patch user: ${res.statusText}`);
                return res.json()
            })
            .then((data: User) => {
                const userIndex = users.findIndex((user: User) => user.id === userId);
                setUsers(old => {
                    const oldUser = structuredClone(old[userIndex])
                    old[userIndex] = {
                        ...oldUser,
                        name: body.name,
                        role: body.role as Role,
                        bio: body.bio
                    }
                    mapUserRoles(old)
                    return old
                })
                return data
            })
            .finally(() => setUsersBusy(false))
    }

    async function deleteUser(id: string) {
        setUsersBusy(true)
        return fetch(`/api/users?id=${id}`, {
            method: "DELETE"
        })
            .then((res) => {
                if (!res.ok) throw new Error(`Could not delete user: ${res.statusText}`);
                return res.json()
            })
            .then((data: User) => {
                const userIndex = users.findIndex((user: User) => user.id === id);
                setUsers(old => {
                    const lhs = old.slice(0, userIndex)
                    const rhs = old.slice(userIndex + 1, old.length)
                    const newArr = lhs.concat(rhs)
                    mapUserRoles(newArr)
                    return newArr
                })
                return data
            })
            .finally(() => setUsersBusy(false))
    }

    const mapUserRoles = (users: User[]) => {
        const mappedUsers: Record<string, string> = {}
        users.forEach((user: User) => {
            if (user.id) mappedUsers[user.id] = user?.role ?? "member"
        })
        setUserRoleMap(mappedUsers)
    }

    const filterUsersById = (id: string) => {
        const userIndex = users.findIndex(user => user.id === id)
        if (userIndex < 0) return null
        return users[userIndex]
    }

    return (
        <UserContext.Provider value={{
            users,
            usersBusy,
            userRoleMap,
            filterUsersById,
            getUsers,
            getUserById,
            updateUser,
            deleteUser
        }}>
            {children}
        </UserContext.Provider>
    )

}

export {UserProvider, UserContext}