import React, {useState} from "react";
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
import {Check, ChevronsUpDown} from "lucide-react";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import LoadingSkeleton from "@/components/loading-skeleton";
import {User} from "next-auth";
import {Textarea} from "@/components/ui/textarea";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {cn} from "@/lib/utils";
import {roles} from "@/lib/database/roles";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList} from "@/components/ui/command";

type Props = {
    user: User;
    isCurrentUser: boolean;
    hidden?: boolean;
    children: React.ReactNode;
    size?: "icon" | "default";

    updateUser: (userId: string, name: string, bio: string, role: string) => Promise<void>;
}

const schema = z.object({
    name: z.string().min(2, {message: "Name must contain at least 2 characters."}).max(50),
    bio: z.string().max(500, {message: "Biography cannot exceed 500 characters."}),
    role: z.string()
})

function EditProfile({user, hidden, isCurrentUser, children, updateUser, size = "default"}: Props) {

    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            name: user.name ?? "",
            bio: user.bio ?? "",
            role: user.role ?? "member",
        },
    })

    function onSubmit(values: z.infer<typeof schema>) {
        setLoading(true)
        updateUser(user.id ?? "0", values.name, values.bio, values.role)
            .finally(() => {
                setOpen(false)
                setLoading(false)
            })
    }

    if (hidden) return null

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    size={size}
                    variant={"default"}
                >
                    { children }
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
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                        {
                            isCurrentUser
                                ?
                                null
                                :
                                <FormField
                                    control={form.control}
                                    name="role"
                                    render={({field}) => (
                                        <FormItem className="flex flex-col">
                                            <FormLabel>Role</FormLabel>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <FormControl>
                                                        <Button
                                                            variant="outline"
                                                            role="combobox"
                                                            className={cn(
                                                                "w-[200px] justify-between",
                                                                !field.value && "text-muted-foreground"
                                                            )}
                                                        >
                                                            {field.value
                                                                ? roles.find(
                                                                    (role) => role.value === field.value
                                                                )?.label
                                                                : "Select a role"}
                                                            <ChevronsUpDown
                                                                className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
                                                        </Button>
                                                    </FormControl>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-[200px] p-0 pointer-events-auto">
                                                    <Command>
                                                        <CommandInput placeholder="Search for a role..."/>
                                                        <CommandList>
                                                            <CommandEmpty>No roles found.</CommandEmpty>
                                                            <CommandGroup>
                                                                {roles.map((role) => (
                                                                    <CommandItem
                                                                        value={role.label}
                                                                        key={role.value}
                                                                        className={"cursor-pointer"}
                                                                        onSelect={() => {
                                                                            form.setValue("role", role.value)
                                                                        }}
                                                                    >
                                                                        <Check
                                                                            className={cn(
                                                                                "mr-2 h-4 w-4",
                                                                                role.value === field.value
                                                                                    ? "opacity-100"
                                                                                    : "opacity-0"
                                                                            )}
                                                                        />
                                                                        {role.label}
                                                                    </CommandItem>
                                                                ))}
                                                            </CommandGroup>
                                                        </CommandList>
                                                    </Command>
                                                </PopoverContent>
                                            </Popover>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                        }
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