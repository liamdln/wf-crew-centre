import {Separator} from "@/components/ui/separator";
import {Card, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import Link from "next/link";
import {MoveRightIcon} from "lucide-react";
import {Button} from "@/components/ui/button";

async function Admin() {

    return (
        <div>
            <div className={"mb-3"}>
                <h1 className={"text-4xl font-bold mb-1"}>Administration</h1>
                <Separator/>
            </div>
            <div className={"grid grid-cols-3 gap-3"}>
                <Card>
                    <CardHeader>
                        <CardTitle>User Management</CardTitle>
                        <CardDescription>Add, remove, or edit users.</CardDescription>
                    </CardHeader>
                    <CardFooter>
                        <Button variant={"outline"} asChild>
                            <Link className={"flex items-center gap-1"} href={"/dashboard/admin/user-management"}>
                                Go <MoveRightIcon className={"h-4 w-4"} />
                            </Link>
                        </Button>
                    </CardFooter>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Sector Management</CardTitle>
                        <CardDescription>Add, removed, or edit sectors and assign crew.</CardDescription>
                    </CardHeader>
                    <CardFooter>
                        <Button variant={"outline"} asChild>
                            <Link className={"flex items-center gap-1"} href={"/dashboard/admin/sector-management"}>
                                Go <MoveRightIcon className={"h-4 w-4"} />
                            </Link>
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}

export default Admin