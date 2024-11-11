// "use client"
//
// import {z} from "zod"
// import {useForm} from "react-hook-form";
// import {zodResolver} from "@hookform/resolvers/zod";
// import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
// import {Input} from "@/components/ui/input";
// import {Button} from "@/components/ui/button";
// import {Textarea} from "@/components/ui/textarea";
// import FormDropdown from "@/components/form-dropdown";
// import DateTimeSelector from "@/components/date-time-selector";
// import {useContext, useState} from "react";
// import {Loader2} from "lucide-react";
// import moment from "moment";
// import {toast} from "@/hooks/use-toast";
// import {Sector} from "@prisma/client";
// import {SectorContext} from "@/context/sectors";
//
//
// function NewSectorForm({ users, loadingUsers, airports, loadingAirports, setOpen, sector }: Props) {
//
//     const { addSector, updateSector } = useContext(SectorContext)
//     const [loading, setLoading] = useState(false)
//
//
//
//     const onSubmit = (values: z.infer<typeof schema>) => {
//         setLoading(true)
//
//         const departureTime = moment().set({ hour: values.departureTime.hour, minute: values.departureTime.minute, seconds: 0 })
//         const arrivalTime = moment().set({ hour: values.arrivalTime.hour, minute: values.arrivalTime.minute, seconds: 0 })
//         const blockTime = moment.duration(arrivalTime.diff(departureTime))
//
//         const body: Sector = {
//             ...values,
//             fromName: airports.filter(airport => airport.value === values.fromIcao)[0].label.split(" - ")[1],
//             toName: airports.filter(airport => airport.value === values.toIcao)[0].label.split(" - ")[1],
//             departureTime: departureTime.toDate(),
//             arrivalTime: arrivalTime.toDate(),
//             blockTime: `${blockTime.hours()}:${blockTime.minutes()}`
//         }
//
//         if (sector?.id) {
//             // sector exists so we are updating it.
//             updateSector(sector.id, body)
//                 .then(() => setOpen(false))
//                 .catch(err => {
//                     console.error(err)
//                     toast({
//                         title: "An Error Occurred",
//                         description: "Could not update sector.",
//                         variant: "destructive"
//                     })
//                 })
//                 .finally(() => setLoading(false))
//         } else {
//             // sector does not exist to create
//             addSector(body)
//                 .then(() => setOpen(false))
//                 .catch(err => {
//                     console.error(err)
//                     toast({
//                         title: "An Error Occurred",
//                         description: "Could not publish sector.",
//                         variant: "destructive"
//                     })
//                 })
//                 .finally(() => setLoading(false))
//         }
//
//     }
//
//     return (
//
//     )
//
// }
//
// export default NewSectorForm