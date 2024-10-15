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
import {useState} from "react";
import {Loader2} from "lucide-react";
import moment from "moment";

const schema = z.object({
    id: z.string().min(4).max(10),
    fromIcao: z.string().min(4).max(4),
    toIcao: z.string().min(4).max(4),
    route: z.string().min(1),
    captain: z.string().min(1),
    firstOfficer: z.string().min(1),
    departureTime: z.object({
        hour: z.number(),
        minute: z.number()
    }),
    arrivalTime: z.object({
        hour: z.number(),
        minute: z.number()
    }),
})

type Props = {
    users: { label: string; value: string; }[];
    airports: { value: string, label: string }[];
    loadingUsers: boolean;
    loadingAirports: boolean;
}

function NewSectorForm({ users, loadingUsers, airports, loadingAirports }: Props) {

    const [loading, setLoading] = useState(false)

    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            id: "",
            fromIcao: "",
            toIcao: "",
            route: "",
            captain: "",
            firstOfficer: "",
            departureTime: { hour: 0, minute: 0 },
            arrivalTime: { hour: 0, minute: 0 },
        },
    })

    const onSubmit = (values: z.infer<typeof schema>) => {
        setLoading(true)

        const departureTime = moment().set({ hour: values.departureTime.hour, minute: values.departureTime.minute, seconds: 0 })
        const arrivalTime = moment().set({ hour: values.arrivalTime.hour, minute: values.arrivalTime.minute, seconds: 0 })
        const blockTime = moment.duration(arrivalTime.diff(departureTime))

        const body = {
            ...values,
            fromName: airports.filter(airport => airport.value === values.fromIcao)[0].label,
            toName: airports.filter(airport => airport.value === values.toIcao)[0].label,
            picId: values.captain,
            foId: values.firstOfficer,
            departureTime: departureTime.toDate(),
            arrivalTime: arrivalTime.toDate(),
            blockTime: `${blockTime.hours()}:${blockTime.minutes()}`
        }

        fetch("/api/sectors/", {
            method: "POST",
            body: JSON.stringify(body)
        })
            .then(res => {
                if (!res.ok) throw new Error(res.statusText)
                return res.json()
            })
            .then(data => console.log(data))
            .catch(err => console.error(err))
            .finally(() => setLoading(false))
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
                                        <Input placeholder="Sector ID" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        The <em><code>WFxxxx</code></em> designated code.
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
                            name="captain"
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
                            name="firstOfficer"
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