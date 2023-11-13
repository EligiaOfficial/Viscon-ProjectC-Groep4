import Nav from "../components/Nav"
import SideBar from "../components/SideBar"

function Dashboard() {

    return (
        <>
            <div className="h-screen flex flex-col">
                <Nav />
                <div className="relative h-full w-full">
                    <SideBar />
                    <div className="pl-[50px] bg-stone-200 h-full w-full">
                        <section className="p-2">
                            <span className="text-2xl">Dashboard</span>
                        </section>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard
