import {auth} from "@/auth";
import {Separator} from "@/components/ui/separator";

async function Dashboard() {

    const session = await auth()

    return (
        <div>
            <div className={"mb-3"}>
                <h1 className={"text-4xl font-bold mb-1"}>Dashboard</h1>
                <Separator/>
            </div>
            <div className={"space-y-6"}>
                <div>
                    <p className={"text-xl"}>Hello {session?.user.name} 👋</p>
                </div>
                <div>

                </div>
            </div>

        </div>
    )

}

export default Dashboard;