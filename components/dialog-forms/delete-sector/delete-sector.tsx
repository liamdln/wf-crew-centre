import {ReactNode} from "react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import {Button} from "@/components/ui/button";
import {TrashIcon} from "lucide-react";
import {Table, TableCell, TableHead, TableRow} from "@/components/ui/table";
import {Sector} from "@prisma/client";

type Props = {
    children: ReactNode;
    sector: Sector;
}

function DeleteSector({children, sector}: Props) {

    const handleSubmit = async () => {

    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                { children }
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely
                        sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete the selected sector:
                        <Table className={"mt-3"}>
                            <TableRow>
                                <TableHead>ID</TableHead>
                                <TableHead>Origin</TableHead>
                                <TableHead>Destination</TableHead>
                            </TableRow>
                            <TableRow>
                                <TableCell>WF{sector.id}</TableCell>
                                <TableCell>{sector.fromIcao}</TableCell>
                                <TableCell>{sector.toIcao}</TableCell>
                            </TableRow>
                        </Table>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <form onSubmit={handleSubmit}>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                </form>
            </AlertDialogContent>
        </AlertDialog>
    )

}

export default DeleteSector;
