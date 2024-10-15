"use client";

import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Separator} from "@/components/ui/separator";
import {Button} from "@/components/ui/button";
import {useState} from "react";
import {cn} from "@/lib/utils";

type Props = {
    hoursHeader?: string;
    minutesHeader?: string;
}

const HOURS = Array.from(Array(24).keys())
const MINUTES = Array.from(Array(60).keys())

function TimeSelector({hoursHeader, minutesHeader}: Props) {

    const [selectedHour, setSelectedHour] = useState(0)
    const [selectedMinute, setSelectedMinute] = useState(0)

    return (
        <Popover>
            <PopoverTrigger className={"block"}>
                <div className={"px-3 py-2 hover:bg-accent hover:text-accent-foreground font-medium text-sm " +
                    "flex gap-3 bg-background text-muted-foreground focus-visible:ring-2" +
                    "ring-offset-background transition-colors focus-visible:outline-none" +
                    "focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none " +
                    "disabled:opacity-50 border border-input rounded-md h-10 items-center"}>
                    <div className={"text-center px-3"}>
                        1 hour
                    </div>
                    <Separator orientation={"vertical"}/>
                    <div className={"text-center px-3"}>
                        1 minute
                    </div>
                </div>
            </PopoverTrigger>
            <PopoverContent>
                <div className={"h-[calc(100svh/3)]"}>
                    <div className={"h-8 flex items-center text-muted-foreground text-sm mb-2"}>
                        <p className={"w-1/2 text-center"}>{hoursHeader}</p>
                        <Separator orientation={"vertical"}/>
                        <p className={"w-1/2 text-center"}>{minutesHeader}</p>
                    </div>
                    <Separator/>
                    <div className={"h-[calc(100%-32px)] py-3 flex"}>
                        <div
                            className={"flex flex-col items-center gap-3 overflow-y-scroll max-h-full grow text-center"}>
                            {
                                HOURS.map(hour => (
                                    <Button type={"button"}
                                            className={cn(selectedHour === hour ? "bg-accent text-accent-foreground" : null, "w-fit")}
                                            key={hour}
                                            variant={"ghost"}
                                            onClick={() => setSelectedHour(hour)}
                                    >
                                        {
                                            hour < 10 ? <span>0{hour}</span> : <span>{hour}</span>
                                        }
                                    </Button>
                                ))
                            }
                        </div>
                        <Separator orientation={"vertical"}/>
                        <div
                            className={"flex flex-col items-center gap-3 overflow-y-scroll max-h-full grow text-center"}>
                            {
                                MINUTES.map(minute => (
                                    <Button type={"button"}
                                            className={cn(selectedMinute === minute ? "bg-accent text-accent-foreground" : null, "w-fit")}
                                            key={minute}
                                            variant={"ghost"}
                                            onClick={() => setSelectedMinute(minute)}
                                    >
                                        {
                                            minute < 10 ? <span>0{minute}</span> : <span>{minute}</span>
                                        }
                                    </Button>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    )

}

export default TimeSelector;