import {auth} from "@/auth";

async function Dashboard() {

    const session = await auth()

    return (
        <div>
            <h1 className={"text-4xl font-bold"}>Dashboard</h1>
            <span>{ JSON.stringify(session) }</span>
        </div>
    )

}

export default Dashboard;