import React from "react";
import {auth} from "@/auth"
import {redirect} from "next/navigation";
import Sidebar from "@/components/sidebar/sidebar";
import {isAdmin, isCrew} from "@/lib/utils";
import {UserProvider} from "@/context/users";
import {SectorProvider} from "@/context/sectors";

type Props = {
    children: React.ReactNode;
}

async function DashboardLayout({children}: Props) {

    const session = await auth()
    if (!session) return redirect("/")
    else if (!isCrew(session.user) && !isAdmin(session.user)) return redirect("/?error=whitelist")

    return (
        <UserProvider>
            <SectorProvider>
                <div className={"h-svh"}>
                    <div className={"w-80 h-full fixed"}>
                        <Sidebar avatarUrl={session.user?.image} username={session.user?.name} role={session.user.role}
                                 id={session.user?.id ?? ""}/>
                    </div>
                    <div className={"p-6 ms-80 h-full"}>
                        {children}
                    </div>
                </div>
            </SectorProvider>
        </UserProvider>
    )

}

export default DashboardLayout