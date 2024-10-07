import {Loader2} from "lucide-react";
import {cn} from "@/lib/utils";

type Props = {
    text?: string;
    className?: string;
}

function LoadingSkeleton({ text, className }: Props) {

    return (
        <div className={"flex justify-center items-center w-full h-full"}>
            <Loader2 className={cn(text ? "me-2" : null, "h-8 w-8 animate-spin", className)} />
            {text}
        </div>
    )

}

export default LoadingSkeleton