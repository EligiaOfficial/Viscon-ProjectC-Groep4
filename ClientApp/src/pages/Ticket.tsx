import {useNavigate} from "react-router-dom";
import {getName, getEmail, getPhone, getRole, getId, getCompany, getDepartment} from '../Endpoints/Jwt'
import Nav from "../components/Nav";
import SideBar from "../components/SideBar";
import RoundButton from "../components/RoundButton";
import {FetchTicketAxios} from "../Endpoints/Dto";
import {useEffect, useState} from "react";

function Ticket() {

    var token = localStorage.getItem("token");
    var {id,name,email,phone,role,company,department} = "Empty";
    var isLoggedIn = false;
    try {
        name = getName(token);
        email = getEmail(token);
        phone = "+"+31+getPhone(token);
        role = getRole(token);
        id = getId(token);
        company = getCompany(token);
        department = getDepartment(token);
        isLoggedIn = true;
    } catch (e) {
        console.log(e);
    }

    const nav = useNavigate();
    
    const logOut = () => {
        localStorage.removeItem('token');
        nav('/login');
    }

    return (
        <>
            <div className="h-full flex flex-col">
                <Nav />
                <div className="relative h-full w-full">
                    <SideBar />
                    <div className="pl-[50px] bg-stone-200 h-full w-full">
                        <section className="flex h-full">
                            <TicketInfo/>
                            <TicketChat/>
                        </section>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Ticket

export function TicketChat() {
    var token = localStorage.getItem("token");
    const id = getId(token!);
    const [department, setDepartment] = useState<object[]>([]);
    const [user, setUser] = useState<object[]>([]);
    const [ticket, setTicket] = useState<object[]>([]);
        
    const fetchTicket = () => {
        FetchTicketAxios( {
            id: 1,
        }).then(res => {
                const { ticket, department, user } = res.data;
                setUser(user);
                setDepartment(department); 
                setTicket(ticket)
        });
    }

    useEffect(() => {
        fetchTicket();
    }, []);
    
    return (
        <div className={"w-5/6 bg-stone-200 flex items-center justify-center"}>
            <div className={"h-full md:w-5/6 w-full flex flex-col items-center"}>
                <div className={"py-5 md:w-3/4 w-full"}>
                    <h1 className={"text-3xl font-bold"}>{"title"}</h1>
                    <h2 className={"text-md font-bold"}>Description of what's broken</h2>
                    <h2 className={"text-md font-bold"}>What did I do, what do I want to see</h2>
                </div>

                <div className="md:w-3/4 w-full bg-white border rounded-lg">
                    <div className={"w-11/12 mx-auto pt-7"}>
                        <textarea id="message" rows="4"
                                  className="block p-2.5 w-full text-sm text-gray-900 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                  placeholder="Write your thoughts here..."/>
                    </div>
                    <div className={"w-11/12 mx-auto"}>
                        <label className="block mb-2 text-sm dark:text-white"
                               htmlFor="file_input"><p className={"font-medium text-gray-900"}>Upload File(s)</p></label>
                        <input className="block w-full text-sm text-gray-900 border rounded-lg
                            cursor-pointer
                            dark:border-gray-600 dark:placeholder-gray-400" id="multiple_files" type="file" multiple/>
                        <div className={"flex flex-row justify-between"}>
                            <p className={"font-medium text-gray-900"}>SVG, PNG or JPG</p>
                            <button type="submit"
                                    className="flex justify-center rounded-md bg-gray-600 px-3 py-1.5 mx-1.5 my-2.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">
                                Submit
                            </button>   
                        </div>
                    </div>
                </div>

                <div className={"md:w-3/4 w-full border rounded-lg mt-2.5 bg-white"}>
                    <div className={"mx-10"}>
                        <ChatField/>
                        <ChatFieldImg/>
                        <ChatField/>
                        <ChatFieldImg/>
                        <ChatField/>
                    </div>
                </div>
                
            </div>
        </div>
    );
}

export function ChatField() {
    return (
        <div className={"w-full pt-5"}>
            <div className={""}>
                <h1 className={"text-2xl font-bold"}>Name</h1>
                <p className={"text-md"}>Lorem Ipsum </p>
            </div>
            <hr className="h-[2px] mt-5 bg-gray-200 border-0 dark:bg-gray-700"/>
        </div>
    );
}

export function ChatFieldImg() {
    return (
        <div className={"w-full"}>
            <div className={"flex md:flex-row flex-col pt-5"}>
                <div className={"md:w-2/5 w-full"}>
                    <h1 className={"text-2xl font-bold"}>Name</h1>
                    <p className={"text-md"}>Lorem Ipsum</p>
                </div>
                <div className={"md:w-3/5 w-full"}>
                    <Carousel/>
                </div>
            </div>
            <hr className="h-[2px] mt-5 bg-gray-200 border-0 dark:bg-gray-700"/>
        </div>

    );
}

export function Carousel() {
    return (
        <div className={"w-full"}>
            <div className="max-w-2xl mx-auto">

                <div id="default-carousel" className="relative" data-carousel="static">
                    <div className="overflow-hidden relative h-56 rounded-lg sm:h-64 xl:h-80 2xl:h-96">
                        <div className="duration-700 ease-in-out" data-carousel-item>
                            <span className="absolute top-1/2 left-1/2 text-2xl font-semibold text-white -translate-x-1/2 -translate-y-1/2 sm:text-3xl dark:text-gray-800">First Slide</span>
                            <img src="https://flowbite.com/docs/images/carousel/carousel-1.svg" className="block absolute top-1/2 left-1/2 w-full -translate-x-1/2 -translate-y-1/2" alt="..."/>
                        </div>
                        <div className="hidden duration-700 ease-in-out" data-carousel-item>
                            <img src="https://flowbite.com/docs/images/carousel/carousel-2.svg" className="block absolute top-1/2 left-1/2 w-full -translate-x-1/2 -translate-y-1/2" alt="..."/>
                        </div>
                        <div className="hidden duration-700 ease-in-out" data-carousel-item>
                            <img src="https://flowbite.com/docs/images/carousel/carousel-3.svg" className="block absolute top-1/2 left-1/2 w-full -translate-x-1/2 -translate-y-1/2" alt="..."/>
                        </div>
                    </div>
                    <div className="flex absolute bottom-5 left-1/2 z-30 space-x-3 -translate-x-1/2">
                        <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 1" data-carousel-slide-to="0"></button>
                        <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 2" data-carousel-slide-to="1"></button>
                        <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 3" data-carousel-slide-to="2"></button>
                    </div>
                    <button type="button" className="flex absolute top-0 left-0 z-30 justify-center items-center px-4 h-full cursor-pointer group focus:outline-none" data-carousel-prev>
            <span className="inline-flex justify-center items-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                <svg className="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
                <span className="hidden">Previous</span>
            </span>
                    </button>
                    <button type="button" className="flex absolute top-0 right-0 z-30 justify-center items-center px-4 h-full cursor-pointer group focus:outline-none" data-carousel-next>
            <span className="inline-flex justify-center items-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                <svg className="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                <span className="hidden">Next</span>
            </span>
                    </button>
                </div>
                <script src="https://unpkg.com/flowbite@1.4.0/dist/flowbite.js"></script>
            </div>
        </div>
    );
}

export function TicketInfo() {
    return (
        <div className={"w-1/6 h-[calc(100vh-50px)] bg-stone-300 flex flex-col items-center"}>

            <div className="flex flex-col">
                <div className="group flex flex-row justify-start py-2">
                    <div className={`flex flex-col items-start justify-center min-w-[50px]`}>
                        <h1 className="flex text-xl">Requestor</h1>
                        <input type="text" disabled value={"Ticket Creator"}/>
                    </div>
                </div>
                <div className="group flex flex-row justify-start py-2">
                    <div className={`flex flex-col items-start justify-center min-w-[50px]`}>
                        <h1 className="flex text-xl">Company</h1>
                        <input type="text" disabled value={"Company Name"}/>
                    </div>
                </div>
                <div className="group flex flex-row justify-start py-2">
                    <div className={`flex flex-col items-start justify-center min-w-[50px]`}>
                        <h1 className="flex text-xl">Machine</h1>
                        <input type="text" disabled value={"Machine"}/>
                    </div>
                </div>
                <div className="group flex flex-row justify-start py-2">
                    <div className={`flex w-full flex-col items-start justify-center min-w-[50px]`}>
                        <h1 className="flex text-xl">Department</h1>
                        {1 == 1 ? (
                            <input type="text" disabled value={"Department"}/>
                        ) : (
                            <select
                                id="role"
                                className="w-full">
                                <option value="0">Department</option>
                            </select>
                        )}
                    </div>
                </div>
                <div className="group flex flex-row justify-start py-2">
                    <div className={`flex flex-col items-start justify-center min-w-[50px]`}>
                        <h1 className="flex text-xl">Assignee</h1>
                        <input type="text" disabled value={"Viscon Employee"}/>
                    </div>
                </div>
            </div>

            <div className="w-[200px] flex flex-col mt-auto">
                <div className="group flex flex-row justify-start">
                    <div className={`w-[200px] flex items-center justify-between`}>
                        <span className="text-xl">Publish Ticket</span>
                        <RoundButton/>
                    </div>
                </div>
                <div className="group flex flex-row justify-start">
                    <div className={`w-[200px] flex items-center justify-between`}>
                        <span className="text-xl">Resolved</span>
                        <RoundButton/>
                    </div>
                </div>
            </div>

        </div>
    );
}