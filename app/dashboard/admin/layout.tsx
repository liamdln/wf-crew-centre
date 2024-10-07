import React from "react";
import {auth} from "@/auth"
import {redirect} from "next/navigation";
import {isAdmin} from "@/lib/utils";

type Props = {
    children: React.ReactNode;
}

async function AdminLayout({children}: Props) {

    const session = await auth()
    if (!session || !isAdmin(session.user)) return redirect("/dashboard")

    return (
        <div className={"h-full"}>
            { children }
        </div>
    )

}

export default AdminLayout