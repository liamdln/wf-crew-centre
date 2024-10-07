import logo from "@/app/images/team_velo_white.png";
import Image from "next/image";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {RxAvatar} from "react-icons/rx";
import {Button} from "@/components/ui/button";
import {signOut} from "@/auth";
import { Separator } from "@/components/ui/separator"
import NavLink from "@/components/sidebar/nav-link";
import {HouseIcon, PlaneTakeoffIcon, ShieldIcon} from "lucide-react";
import {capitaliseFirstLetter} from "@/lib/utils";
import Link from "next/link";

type Props = {
    avatarUrl: string | undefined | null;
    username: string | undefined | null;
    role: string;
    id: string;
}

function Sidebar({avatarUrl, username, role, id }: Props) {

    return (
        <div className={"w-full h-full bg-secondary text-secondary-foreground p-3 flex flex-col justify-between"}>
            <div>
                <Image src={logo} alt={"Team Velocity"} width={"390"} height={"185"}/>
            </div>
            <Separator className={"bg-secondary-foreground/30 h-[2px]"} />
            <div className={"mt-3 flex flex-col grow"}>
                <NavLink href={"/dashboard"}><HouseIcon className={"w-6 h-6"} />Dashboard</NavLink>
                <NavLink href={"/dashboard/sectors"}><PlaneTakeoffIcon className={"w-6 h-6"} />Sectors</NavLink>
                <NavLink href={"/dashboard/admin"} hidden={role !== "admin"}><ShieldIcon className={"w-6 h-6"} />Administration</NavLink>
            </div>
            <div>
                <div className={"flex items-center justify-between gap-3"}>
                    <Link href={`/dashboard/profile?id=${id}`} className={"flex items-center gap-3 hover:bg-background rounded p-3 grow"}>
                        <Avatar>
                            <AvatarImage src={avatarUrl ?? undefined}/>
                            <AvatarFallback><RxAvatar className={"h-full w-full"}/></AvatarFallback>
                        </Avatar>
                        <div className={"flex flex-col"}>
                            <span>{ username }</span>
                            <span className={"text-xs text-muted-foreground italic"}>{ capitaliseFirstLetter(role) }</span>
                        </div>
                    </Link>
                    <form action={async () => {
                        "use server";
                        await signOut()
                    }}>
                        <Button type={"submit"}>Sign Out</Button>
                    </form>
                </div>
            </div>
        </div>
    )

}

export default Sidebar;