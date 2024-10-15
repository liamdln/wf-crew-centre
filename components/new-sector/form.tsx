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

const schema = z.object({
    id: z.string().min(4).max(10),
    fromIcao: z.string().min(4).max(4),
    toIcao: z.string().min(4).max(4),
    route: z.string().min(1),
    captain: z.string().min(1),
    firstOfficer: z.string().min(1),
    departureTime: z.string().min(1),
    arrivalTime: z.string().min(1),
    blockTime: z.string().min(1),
})

type Props = {
    users: { label: string; value: string; }[];
    airports: { value: string, label: string }[];
    loadingUsers: boolean;
    loadingAirports: boolean;
}

function NewSectorForm({ users, loadingUsers, airports, loadingAirports }: Props) {

    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            id: "",
            fromIcao: "",
            toIcao: "",
            route: "",
            captain: "",
            firstOfficer: "",
            departureTime: "",
            arrivalTime: "",
            blockTime: "",
        },
    })

    function onSubmit(values: z.infer<typeof schema>) {
        console.log(values)
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
                                                      fieldValue={field.value}
                                                      formKey={"fromIcao"}
                                                      setValue={form.setValue}
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
                                                      fieldValue={field.value}
                                                      formKey={"toIcao"}
                                                      setValue={form.setValue}
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
                                                          fieldValue={field.value}
                                                          formKey={"captain"}
                                                          setValue={form.setValue}
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
                                                          fieldValue={field.value}
                                                          formKey={"firstOfficer"}
                                                          setValue={form.setValue}
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
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Departure Time</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Origin ICAO" {...field} />
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
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Arrival Time</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Origin ICAO" {...field} />
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
                            name="blockTime"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Block Time</FormLabel>
                                    <FormControl>
                                        <TimeSelector hoursHeader={"Hours"}
                                                      minutesHeader={"Minutes"}
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )

}

export default NewSectorForm