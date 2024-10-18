"use client"

import {z} from "zod"
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Textarea} from "@/components/ui/textarea";
import FormDropdown from "@/components/form-dropdown";
import TimeSelector from "@/components/time-selector";
import {useContext, useState} from "react";
import {Loader2} from "lucide-react";
import moment from "moment";
import {toast} from "@/hooks/use-toast";
import {Sector} from "@prisma/client";
import {SectorContext} from "@/context/sectors";

const schema = z.object({
    id: z.number().min(1000).max(9999),
    fromIcao: z.string().min(4).max(4),
    toIcao: z.string().min(4).max(4),
    route: z.string().min(1),
    picId: z.string().min(1),
    foId: z.string().min(1),
    departureTime: z.object({
        hour: z.number(),
        minute: z.number()
    }),
    arrivalTime: z.object({
        hour: z.number(),
        minute: z.number()
    }),
}).refine(data => data.picId !== data.foId, {
    message: "Captain and First Officer cannot be the same.",
    path: ["foId"]
})

type Props = {
    users: { label: string; value: string; }[];
    airports: { value: string, label: string }[];
    loadingUsers: boolean;
    loadingAirports: boolean;
    setOpen: (open: boolean) => void;
    sector?: Sector;
}

function NewSectorForm({ users, loadingUsers, airports, loadingAirports, setOpen, sector }: Props) {

    const { addSector, updateSector } = useContext(SectorContext)
    const [loading, setLoading] = useState(false)

    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            id: sector?.id,
            fromIcao: sector?.fromIcao ?? "",
            toIcao: sector?.toIcao ?? "",
            route: sector?.route.toUpperCase() ?? "",
            picId: sector?.picId ?? "",
            foId: sector?.foId ?? "",
            departureTime: {
                hour: sector?.departureTime ? moment(sector?.departureTime).hours() : 0,
                minute: sector?.departureTime ? moment(sector?.departureTime).minutes() : 0,
            },
            arrivalTime: {
                hour: sector?.arrivalTime ? moment(sector?.arrivalTime).hours() : 0,
                minute: sector?.departureTime ? moment(sector?.arrivalTime).minutes() : 0
            },
        },
    })

    const onSubmit = (values: z.infer<typeof schema>) => {
        setLoading(true)

        const departureTime = moment().set({ hour: values.departureTime.hour, minute: values.departureTime.minute, seconds: 0 })
        const arrivalTime = moment().set({ hour: values.arrivalTime.hour, minute: values.arrivalTime.minute, seconds: 0 })
        const blockTime = moment.duration(arrivalTime.diff(departureTime))

        const body: Sector = {
            ...values,
            fromName: airports.filter(airport => airport.value === values.fromIcao)[0].label,
            toName: airports.filter(airport => airport.value === values.toIcao)[0].label,
            departureTime: departureTime.toDate(),
            arrivalTime: arrivalTime.toDate(),
            blockTime: `${blockTime.hours()}:${blockTime.minutes()}`
        }

        if (sector?.id) {
            // sector exists so we are updating it.
            updateSector(sector.id, body)
                .then(() => setOpen(false))
                .catch(err => {
                    console.error(err)
                    toast({
                        title: "An Error Occurred",
                        description: "Could not update sector.",
                        variant: "destructive"
                    })
                })
                .finally(() => setLoading(false))
        } else {
            // sector does not exist to create
            addSector(body)
                .then(() => setOpen(false))
                .catch(err => {
                    console.error(err)
                    toast({
                        title: "An Error Occurred",
                        description: "Could not publish sector.",
                        variant: "destructive"
                    })
                })
                .finally(() => setLoading(false))
        }

    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                <div className={"flex gap-6"}>
                    <div className={"flex flex-col gap-3 w-full"}>
                        <FormField
                            control={form.control}
                            name="id"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Sector ID</FormLabel>
                                    <FormControl>
                                        <Input type={"number"}
                                               placeholder="Sector ID"
                                               value={field.value}
                                               onChange={(e) => field.onChange(e.target.valueAsNumber)}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        The <em><code>WFxxxx</code></em> designated code. Don&apos;t include the <em><code>WF</code></em> prefix.
                                    </FormDescription>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="fromIcao"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Origin ICAO Code</FormLabel>
                                    <FormControl>
                                        <FormDropdown items={airports}
                                                      value={field.value}
                                                      onChange={field.onChange}
                                                      hint={"Select a destination ICAO"}
                                                      loading={loadingAirports}
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="toIcao"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Destination ICAO Code</FormLabel>
                                    <FormControl>
                                        <FormDropdown items={airports}
                                                      value={field.value}
                                                      onChange={field.onChange}
                                                      hint={"Select an arrival ICAO"}
                                                      loading={loadingAirports}
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="route"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Route</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Route" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className={"flex flex-col gap-3 w-full"}>
                        <FormField
                            control={form.control}
                            name="picId"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Captain</FormLabel>
                                    <FormControl>
                                        <div className={"w-full"}>
                                            <FormDropdown items={users}
                                                          value={field.value}
                                                          onChange={field.onChange}
                                                          hint={"Select a captain"}
                                                          loading={loadingUsers}
                                            />
                                        </div>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="foId"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>First Officer</FormLabel>
                                    <FormControl>
                                        <div className={"w-full"}>
                                            <FormDropdown items={users}
                                                          value={field.value}
                                                          onChange={field.onChange}
                                                          hint={"Select a first officer"}
                                                          loading={loadingUsers}
                                            />
                                        </div>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="departureTime"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Departure Time</FormLabel>
                                    <FormControl>
                                        <TimeSelector displayAsTime={true}
                                                      value={field.value}
                                                      onChange={field.onChange}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Time should be in Zulu Time (GMT).
                                    </FormDescription>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="arrivalTime"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Arrival Time</FormLabel>
                                    <FormControl>
                                        <TimeSelector displayAsTime={true}
                                                      value={field.value}
                                                      onChange={field.onChange}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Time should be in Zulu Time (GMT).
                                    </FormDescription>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
                <Button type="submit" disabled={loading}>
                    {
                        loading
                        ?
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Please wait
                            </>
                            :
                            <>Submit</>
                    }
                </Button>
            </form>
        </Form>
    )

}

export default NewSectorForm