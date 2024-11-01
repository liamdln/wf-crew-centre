import {ReactNode} from "react";
import {
    AlertDialog, AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import {User} from "next-auth";
import {handleDeleteUser} from "@/components/dialog-forms/delete-user/action";

type Props = {
    children?: ReactNode;
    user: User;
}

function DeleteUser({children, user}: Props) {

    const handleFormSubmit = async () => {
        await handleDeleteUser(user)
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                {children}
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This will remove any information about {user.name} from
                        the system.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <form action={handleFormSubmit}>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction type={"submit"}>
                            Continue
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </form>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default DeleteUser;