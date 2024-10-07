import {Card, CardContent} from "@/components/ui/card";
import Image from "next/image";
import logo from "@/app/images/team_velo_white.png";
import {Button} from "@/components/ui/button";
import {FaDiscord} from "react-icons/fa";
import {signIn} from "@/auth";
import {cn} from "@/lib/utils";

type Props = {
    className?: string;
}

async function LoginBox({ className }: Props) {

    const login = async () => {
        "use server";
        await signIn("discord", { redirectTo: "/dashboard" })
    }

    return (
        <Card className={cn(className)}>
            <CardContent className={"flex flex-col items-center"}>
                <Image src={logo} alt={"Team Velocity"} width={"390"} height={"185"}/>
                <div className={"flex flex-col justify-center gap-3"}>
                    <h1 className={"text-3xl font-bold text-center"}>Crew Centre</h1>
                    <form className={"w-full"} action={login}>
                        <Button
                            type={"submit"}
                            className={"bg-discord-blurple hover:bg-discord-blurple/80 text-white w-full"}>
                            <FaDiscord className={"h-6 w-6 me-1"}/>Login with Discord
                        </Button>
                    </form>
                </div>
            </CardContent>
        </Card>
    )

}

export default LoginBox