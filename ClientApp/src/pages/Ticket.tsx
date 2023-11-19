import nav from "../components/Nav";
import {useNavigate} from "react-router-dom";
import {getName, getEmail, getPhone, getRole, getId, getCompany, getDepartment} from '../Endpoints/Jwt'
import Nav from "../components/Nav";
import GradientNav from "../components/GradientNav";
import SideBar from "../components/SideBar";
import RoundButton from "../components/RoundButton";

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
            <div className="h-screen flex flex-col">
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
    return (
        <div className={"w-5/6 bg-stone-200 flex items-center justify-center"}>
            <div className={"h-full md:w-5/6 w-full flex flex-col items-center"}>
                <div className={"py-5 md:w-3/4 w-full"}>
                    <h1 className={"text-3xl font-bold"}>Maxhine zyx broke</h1>
                    <h2 className={"text-md font-bold"}>Possible extremely long description Possible extremely long description </h2>
                </div>

                <div className="md:w-3/4 w-full bg-white border">
                    <div>
                        <textarea id="message" rows="4"
                                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                  placeholder="Write your thoughts here..."/>
                    </div>
                    <div className={""}>
                        <label className="block mb-2 text-sm dark:text-white"
                               htmlFor="file_input"><p className={"font-medium text-gray-900"}>Upload File(s)</p></label>
                        <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg
                            cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700
                            dark:border-gray-600 dark:placeholder-gray-400" id="multiple_files" type="file" multiple/>
                        <div className={"flex flex-row justify-between"}>
                            <p className={"font-medium text-gray-900"}>SVG, PNG or JPG</p>
                            <button>Test</button>    
                        </div>
                    </div>
                </div>

                <div className={"md:w-3/4 w-full border bg-white"}>
                    <div className={"mx-10"}>
                        <ChatField/>
                        <ChatField/>
                        <ChatFieldImg/>
                        <ChatFieldImg/>
                        <ChatField/>
                        <ChatField/>
                        <ChatFieldImg/>
                        <ChatField/>
                        <ChatField/>
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
                <h1 className={"text-2xl"}>Name</h1>
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
                    <h1 className={"text-2xl"}>Name</h1>
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
        <div id="default-carousel" className="relative w-full" data-carousel="slide">
            <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
                <div className="hidden duration-700 ease-in-out" data-carousel-item>
                    <img src="https://flowbite.com/docs/images/carousel/carousel-1.svg"
                         className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..."/>
                </div>
                <div className="hidden duration-700 ease-in-out" data-carousel-item>
                    <img src="https://flowbite.com/docs/images/carousel/carousel-1.svg"
                         className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..."/>
                </div>
                <div className="hidden duration-700 ease-in-out" data-carousel-item>
                    <img src="https://flowbite.com/docs/images/carousel/carousel-1.svg"
                         className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..."/>
                </div>
                <div className="hidden duration-700 ease-in-out" data-carousel-item>
                    <img src="https://flowbite.com/docs/images/carousel/carousel-1.svg"
                         className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..."/>
                </div>
                <div className="hidden duration-700 ease-in-out" data-carousel-item>
                    <img src="https://flowbite.com/docs/images/carousel/carousel-1.svg"
                         className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..."/>
                </div>
            </div>
            <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
                <button type="button" className="w-3 h-3 rounded-full" aria-current="true" aria-label="Slide 1"
                        data-carousel-slide-to="0"/>
                <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 2"
                        data-carousel-slide-to="1"/>
                <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 3"
                        data-carousel-slide-to="2"/>
                <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 4"
                        data-carousel-slide-to="3"/>
                <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 5"
                        data-carousel-slide-to="4"/>
            </div>
            <button type="button"
                    className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                    data-carousel-prev>
        <span
            className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true"
                 xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M5 1 1 5l4 4"/>
            </svg>
            <span className="sr-only">Previous</span>
        </span>
            </button>
            <button type="button"
                    className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                    data-carousel-next>
        <span
            className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true"
                 xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="m1 9 4-4-4-4"/>
            </svg>
            <span className="sr-only">Next</span>
        </span>
            </button>
        </div>
    );
}

export function TicketInfo() {
    return (
        <div className={"w-1/6 h-full bg-stone-300 flex flex-col items-center"}>

            <div className="flex flex-col">
                <div className="group flex flex-row justify-start py-2">
                    <div className={`flex flex-col items-start justify-center min-w-[50px]`}>
                        <h1 className="flex">Requestor</h1>
                        <input type="text" disabled value={"Ticket Creator"}/>
                    </div>
                </div>
                <div className="group flex flex-row justify-start py-2">
                    <div className={`flex flex-col items-start justify-center min-w-[50px]`}>
                        <h1 className="flex">Company</h1>
                        <input type="text" disabled value={"Company Name"}/>
                    </div>
                </div>
                <div className="group flex flex-row justify-start py-2">
                    <div className={`flex flex-col items-start justify-center min-w-[50px]`}>
                        <h1 className="flex">Machine</h1>
                        <input type="text" disabled value={"Machine"}/>
                    </div>
                </div>
                <div className="group flex flex-row justify-start py-2">
                    <div className={`flex w-full flex-col items-start justify-center min-w-[50px]`}>
                        <h1 className="flex">Department</h1>
                        {2 == 1 ? (
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
                        <h1 className="flex">Assignee</h1>
                        <input type="text" disabled value={"Viscon Employee"}/>
                    </div>
                </div>
            </div>

            <div className="w-[200px] flex flex-col mt-auto">
                <div className="group flex flex-row justify-start">
                    <div className={`w-[200px] flex items-center justify-between`}>
                        <span className="">Publish Ticket</span>
                        <RoundButton/>
                    </div>
                </div>
                <div className="group flex flex-row justify-start">
                    <div className={`w-[200px] flex items-center justify-between`}>
                        <span className="">Resolved</span>
                        <RoundButton/>
                    </div>
                </div>
            </div>

        </div>
    );
}