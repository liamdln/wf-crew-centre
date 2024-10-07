import {useState} from "react";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {EditIcon} from "lucide-react";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import LoadingSkeleton from "@/components/loading-skeleton";
import {User} from "next-auth";
import {Textarea} from "@/components/ui/textarea";

type Props = {
    user: { role: string } & User;
    hidden?: boolean;
}

const schema = z.object({
    name: z.string().min(2, {message: "Name must contain at least 2 characters."}).max(50),
    bio: z.string().max(500, {message: "Biography cannot exceed 500 characters."})
})

function EditProfile({user, hidden}: Props) {

    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            name: user.name ?? "",
            bio: user.bio ?? ""
        },
    })

    function onSubmit(values: z.infer<typeof schema>) {
        console.log(values)
        setLoading(false)
    }

    if (hidden) return null

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    variant={"default"}
                >
                    <EditIcon className={"w-4 h-4 me-2"}/>
                    Edit Profile
                </Button>
            </DialogTrigger>
            <DialogContent onInteractOutside={(e) => e.preventDefault()}>
                <DialogHeader>
                    <DialogTitle>Editing {user.name}</DialogTitle>
                    <DialogDescription>
                        Change {user.name}&apos;s profile details.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Name" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>

                            )}
                        />
                        <FormField
                            control={form.control}
                            name="bio"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Biography</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Biography" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <Button type="submit" disabled={loading}>
                            {
                                loading
                                    ?
                                    <LoadingSkeleton text={"Please Wait"} className={"h-4 w-4"}/>
                                    :
                                    <span>Save</span>
                            }
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )

}

export default EditProfile;