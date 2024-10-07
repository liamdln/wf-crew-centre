import LoginBox from "@/components/login-box";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";
import {TriangleAlertIcon} from "lucide-react";
import {auth} from "@/auth";
import {redirect} from "next/navigation";

type Props = {
    searchParams: {
        error?: string;
    };
}

export default async function Home({ searchParams }: Props) {

    const session = await auth()
    if (session && !searchParams.error) return redirect("/dashboard")

    return (
        <div className="w-full h-svh flex flex-col justify-center items-center px-3 md:px-0 gap-3">
            <Alert className={"w-[40%] bg-red-500 border-red-500"} hidden={searchParams.error !== "whitelist"}>
                <TriangleAlertIcon className="h-4 w-4" />
                <AlertTitle>Heads up!</AlertTitle>
                <AlertDescription>
                    You&apos;re not whitelisted to use this tool. Please contact a member of the team if you believe
                    that this is an error.
                </AlertDescription>
            </Alert>
            <LoginBox className={"w-[40%]"} />
        </div>
    );
}
