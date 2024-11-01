import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {ChevronRightIcon, Dot, PlaneLandingIcon, PlaneTakeoffIcon} from "lucide-react";
import Link from "next/link";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import {Sector} from "@prisma/client";
import moment from 'moment/min/moment-with-locales';
import {cn, mapUserRoles} from "@/lib/utils";

type Props = {
    sector: Sector;
    className?: string;
}

async function SectorCard({ sector, className }: Props) {

    const userRoleMap = await mapUserRoles()

    return (
        <Card className={cn(className)} key={sector.id}>
            <CardHeader>
                <div
                    className={"flex items-center justify-between p-3 rounded-t-lg bg-primary -m-6 mb-2"}>
                    <h1 className={"text-xl font-bold"}>WF{sector.id}</h1>
                    <p className={"text-sm"}>NPT11W</p>
                </div>
                <CardTitle className={"flex justify-between items-center"}>
                    <div className={"w-1/3 overflow-x-scroll"}>
                        <p className={"text-xs text-muted-foreground"}>
                            {moment(sector.departureTime).locale("en-gb").format("LT")}
                        </p>
                        <div className={"flex gap-3"}>
                            <PlaneTakeoffIcon/>
                            {sector.fromIcao}
                        </div>
                        <p className={"text-xs text-muted-foreground"}>{sector.fromName}</p>
                    </div>
                    <div className={"flex justify-center"}>
                        <Dot/><Dot/><Dot/><ChevronRightIcon/>
                    </div>
                    <div className={"w-1/3 overflow-x-scroll flex flex-col items-end"}>
                        <div>
                            <p className={"text-xs text-muted-foreground"}>
                                {moment(sector.arrivalTime).locale("en-gb").format("LT")}
                            </p>
                            <div className={"flex gap-3"}>
                                <PlaneLandingIcon/>
                                {sector.toIcao}
                            </div>
                            <p className={"text-xs text-muted-foreground"}>{sector.toName}</p>
                        </div>
                    </div>
                </CardTitle>
            </CardHeader>
            <CardContent className={"space-y-6 text-sm"}>
                <div>
                    <h1 className={"text-xl font-bold"}>Crew</h1>
                    <p>Crewed By{" "}
                        {
                            sector.picId
                                ? <Link href={`/dashboard/profile?id=${sector.picId}`}
                                        className={"underline"}>{userRoleMap[sector.picId]}</Link>
                                : <span>Unknown</span>
                        }{" "}
                        <span className={"text-muted-foreground italic text-xs"}>(PIC)</span> and{" "}
                        {
                            sector.foId
                                ? <Link href={`/dashboard/profile?id=${sector.foId}`}
                                        className={"underline"}>{userRoleMap[sector.foId]}</Link>
                                : <span>Unknown</span>
                        }{" "}
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
    )
}

export default SectorCard;