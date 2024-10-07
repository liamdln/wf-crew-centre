import React from "react";
import Link from "next/link";

type Props = {
    children: React.ReactNode;
    href: string;
    hidden?: boolean;
}

function NavLink({ children, href, hidden }: Props) {

    if (hidden) return null

    return (
        <Link href={href} className={"flex items-center gap-2 p-3 w-full text-start cursor-pointer hover:bg-background rounded"}>
            { children }
        </Link>
    )

}

export default NavLink