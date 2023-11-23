import Nav from "../components/Nav"
import SideBar from "../components/SideBar"

function Dashboard() {

    return (
        <>
            <div className="h-screen flex flex-col">
                <Nav />
                <div className="relative flex flex-row h-full w-full overflow-y-hidden">
                    <SideBar />
                    <div className="bg-stone-200 h-full w-full bg-red-600 overflow-y-scroll">
                        <div className="p-2 flex flex-col gap-4 w-full">
                            <span className="text-2xl">Dashboard</span>
                            <div className="bg-white w-full p-2">
                                <table className="w-full">
                                    <tbody>
                                        <tr className="text-left">
                                            <th>Ticket ID</th>
                                            <th>Status</th>
                                            <th>Issued By</th>
                                            <th>Company</th>
                                            <th>Machine</th>
                                            <th>Assigned To</th>
                                            <th>Created</th>
                                            <th>Modified</th>
                                        </tr>
                                        <tr className="hover:bg-stone-200 cursor-pointer translate duration-100">
                                            <td>10293181</td>
                                            <td>Open</td>
                                            <td>Freek Jansen</td>
                                            <td>Struxxure</td>
                                            <td>E-1932</td>
                                            <td>Sarah Frans</td>
                                            <td>01-10-2022</td>
                                            <td>05-10-2022</td>
                                        </tr>
                                        <tr className="hover:bg-stone-200 cursor-pointer translate duration-100">
                                            <td>10293190</td>
                                            <td>Open</td>
                                            <td>Sam Smit</td>
                                            <td>Nutrition X</td>
                                            <td>A-1923</td>
                                            <td>Vera Hulsen</td>
                                            <td>01-11-2023</td>
                                            <td>05-11-2023</td>
                                        </tr>
                                        <tr className="hover:bg-stone-200 cursor-pointer translate duration-100">
                                            <td>10293195</td>
                                            <td>Open</td>
                                            <td>Jeanne Eclaire</td>
                                            <td>Vetel Logistics</td>
                                            <td>C-1023</td>
                                            <td>Daan Vlaardingen</td>
                                            <td>02-11-2023</td>
                                            <td>03-11-2023</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard
