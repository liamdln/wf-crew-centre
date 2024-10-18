import {Separator} from "@/components/ui/separator";
import {getSectors} from "@/lib/database/sectors";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {ChevronRightIcon, Dot, PlaneLandingIcon, PlaneTakeoffIcon} from "lucide-react";
import moment from 'moment/min/moment-with-locales';
import {getAllUsers} from "@/lib/database/users";
import {User} from "next-auth";
import Link from "next/link";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";

async function Sectors() {

    const sectors = await getSectors()
    const allUsers = await getAllUsers()
    const mappedUsers: Record<string, string> = {}
    allUsers.forEach(user => {
        if (user.id) mappedUsers[user.id] = user?.name ?? "Unknown"
    })

    return (
        <div>
            <div className={"mb-3"}>
                <h1 className={"text-4xl font-bold mb-1"}>Sectors</h1>
                <Separator/>
            </div>
            <div className={"grid grid-cols-3 gap-6"}>
                {
                    sectors.map((sector) => (
                        <Card key={sector.id}>
                            <CardHeader>
                                <div className={"flex items-center justify-between p-3 rounded-t-lg bg-primary -m-6 mb-0"}>
                                    <h1 className={"text-xl font-bold"}>WF{sector.id}</h1>
                                    <p className={"text-sm"}>NPT11W</p>
                                </div>
                                <CardTitle className={"flex justify-between items-center"}>
                                    <div>
                                        <span
                                            className={"text-xs text-muted-foreground"}>{moment(sector.departureTime).locale("en-gb").format("LT")}</span>
                                        <div className={"flex gap-3"}>
                                            <PlaneTakeoffIcon/>
                                            {sector.fromIcao}
                                        </div>
                                        <span className={"text-xs text-muted-foreground"}>{sector.fromName}</span>
                                    </div>
                                    <div className={"flex pt-6"}>
                                        <Dot/><Dot/><Dot/><ChevronRightIcon/>
                                    </div>
                                    <div>
                                        <span
                                            className={"text-xs text-muted-foreground"}>{moment(sector.arrivalTime).locale("en-gb").format("LT")}</span>
                                        <div className={"flex gap-3"}>
                                            <PlaneLandingIcon/>
                                            {sector.toIcao}
                                        </div>
                                        <span className={"text-xs text-muted-foreground"}>{sector.toName}</span>
                                    </div>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className={"space-y-6"}>
                                <div>
                                    <h1 className={"text-xl font-bold"}>Crew</h1>
                                    <p>Crewed By{" "}
                                        <Link href={`/dashboard/profile?id=${sector.picId}`}
                                              className={"underline"}>{mappedUsers[sector.picId]}</Link>{" "}
                                        <span className={"text-muted-foreground italic text-xs"}>(PIC)</span> and{" "}
                                        <Link href={`/dashboard/profile?id=${sector.foId}`}
                                              className={"underline"}>{mappedUsers[sector.foId]}</Link>{" "}
                                        <span className={"text-muted-foreground italic text-xs"}>(FO)</span>.
                                    </p>
                                </div>
                                <div>
                                    <h1 className={"text-xl font-bold"}>Flight Time</h1>
                                    <p>Expected flight time of {sector.blockTime.split(":")[0]} hours
                                        and {sector.blockTime.split(":")[1]} minutes.</p>
                                </div>
                                <div>
                                    <Accordion type="single" collapsible>
                                        <AccordionItem value="item-1">
                                            <AccordionTrigger className={"text-xl font-bold"}>Route</AccordionTrigger>
                                            <AccordionContent>
                                                {sector.route.toUpperCase()}
                                            </AccordionContent>
                                        </AccordionItem>
                                    </Accordion>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                }
            </div>
        </div>
    )
}

export default Sectors