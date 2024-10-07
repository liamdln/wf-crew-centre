"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import NewSectorForm from "@/components/new-sector/form";

function NewSector() {

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>New Sector</Button>
            </DialogTrigger>
            <DialogContent className={"max-w-[75%]"} onInteractOutside={(e) => e.preventDefault()}>
                <DialogHeader>
                    <DialogTitle>New Sector</DialogTitle>
                    <DialogDescription>
                        Adds a new sector to the sector list.
                    </DialogDescription>
                </DialogHeader>
                <NewSectorForm />
            </DialogContent>
        </Dialog>
    )

}

export default NewSector