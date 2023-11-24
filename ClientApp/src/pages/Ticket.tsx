/*
 *   Copyright (c) 2023 
 *   All rights reserved.
 */
import {useNavigate, useSearchParams} from "react-router-dom";

import {getId, getRole} from '../Endpoints/Jwt'
import Nav from "../components/Nav";
import SideBar from "../components/SideBar";
import RoundButton from "../components/RoundButton";
import {createMessageAxios, FetchTicketAxios} from "../Endpoints/Dto";
import {useEffect, useState} from "react";

const Ticket = () => {
    const [searchParams] = useSearchParams();
    const Id = searchParams.get('id') || " ";
    const TicketId = parseInt(Id, 10);

    if (isNaN(TicketId)) {
        return <div>Invalid Ticket</div>;
    }

    const [ticket, setTicket] = useState<object>([]);
    const [department, setDepartment] = useState<string>("");
    const [creator, setCreator] = useState<string>("");
    const [helper, setHelper] = useState<string>("");
    const [company, setCompany] = useState<string>("");
    const [machine, setMachine] = useState<string>("");
    const [messages, setMessages] = useState<object[]>([]);

    const fetchTicket = () => {
        FetchTicketAxios(TicketId).then(res => {
            const { company, creator, department, helper, machine, messages, ticket } = res.data;
            setCompany(company);
            setCreator(creator);
            setDepartment(department);
            setHelper(helper);
            setMachine(machine)
            setMessages(messages);
            setTicket(ticket);
        })
            .catch(err => console.log(err));
    }

    useEffect(() => {
        fetchTicket();
    }, []);
    
    return (
        <>
            <div className="h-screen flex flex-col">
                <Nav />
                <div className="flex flex-row relative h-full w-full">
                    <SideBar />
                    <div className="bg-stone-200 h-full w-full">
                        <section className="flex h-full">
                            <TicketInfo assignee={helper} company={company} department={department} machine={machine} requester={creator} />
                            <TicketChat ticket={ticket} messages={messages || []}/>
                        </section>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Ticket

const TicketChat = ({ticket, messages}: {ticket: object, messages: object[]}) => {
    const { ID } = useParams();
    let TicketId = parseInt(ID, 10);
    parseInt(ID, 10)
    
    const [content, setMsg] = useState('');
    const [img] = useState('');
    const token = localStorage.getItem("token");
        
    const submitMessage = (e) => {
        // e.preventDefault(); // TODO: Reload Chat ipv Page
        console.log('msg: ' + content);

        if (content !== "") {
            createMessageAxios({
                content: content,
                ticketId: +TicketId,
                sender: +getId(token)
            }).then(() => {
                console.log(content, img);
            }).catch(error => {
                console.error("Error:", error);
            });
        }
    }
    
    return (
        <div className={"w-5/6 bg-stone-200 flex items-center justify-center"}>
            <div className={"h-full md:w-5/6 w-full flex flex-col items-center"}>
                <div className={"py-5 md:w-3/4 w-full"}>
                    <h1 className={"text-3xl font-bold"}>{ticket["title"]}</h1>
                    <h2 className={"text-md font-bold"}>{ticket["description"]}</h2>
                    <h2 className={"text-md font-bold"}>{ticket["madeAnyChanges"]}</h2>
                    <h2 className={"text-md font-bold"}>{ticket["expectedToBeDone"]}</h2>
                </div>

                <div className="md:w-3/4 w-full bg-white border rounded-lg">
                    <div className={"w-11/12 mx-auto pt-7"}>
                        <textarea id="message" rows="4"
                                  onChange={(e) => setMsg(e.target.value)}
                                  className="block p-2.5 w-full text-sm text-gray-900 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                  placeholder="Write your thoughts here..."/>
                    </div>
                    <form className={"w-11/12 mx-auto"} onSubmit={submitMessage}>
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
                    </form>
                </div>

                {messages.length > 0 ? (
                    <div className="md:w-3/4 w-full border rounded-lg mt-2.5 bg-white">
                        <div className="mx-10">
                            {messages.map((message, index) => (
                                <ChatField key={index} message={message["content"]} user={message["sender"]} timestamp={message["timeSent"]}/>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="md:w-3/4 w-full border rounded-lg mt-2.5 bg-white">
                        <div className="mx-10">
                            <div className={"w-full py-5"}>
                                <div className={""}>
                                    <p className={"text-md"}>No messages found yet...</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

let ChatField = ({user, message, timestamp}: {user: string, message: string, timestamp: string}) => {

    const date = new Date(timestamp);
    const formattedDate = new Intl.DateTimeFormat('en-GB', {
        year: '2-digit',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    }).format(date);
    
    return (
        <div className={"w-full pt-5"}>
            <div className={""}>
                <div className={"flex flex-row items-center justify-between"}>
                    <h1 className={"text-2xl font-bold"}>{user}</h1>
                    <p className={"text-sm mr-2.5"}>{formattedDate}</p>
                </div>
                <p className={"text-md"}>{message}</p>
            </div>
            <hr className="h-[2px] mt-5 bg-gray-200 border-0 dark:bg-gray-700"/>
        </div>
    );
}

let ChatFieldImg = ({user, message, timestamp}: {user: string, message: string, timestamp: string}) => {

    const date = new Date(timestamp);
    const formattedDate = new Intl.DateTimeFormat('en-GB', {
        year: '2-digit',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    }).format(date);
    
    return (
        <div className={"w-full"}>
            <div className={"flex md:flex-row flex-col pt-5"}>
                <div className={"md:w-2/5 w-full"}>
                    <div className={"flex flex-row items-center justify-between"}>
                        <h1 className={"text-2xl font-bold"}>{user}</h1>
                        <p className={"text-sm mr-2.5"}>{formattedDate}</p>
                    </div>
                    <p className={"text-md"}>{message}</p>
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

const TicketInfo = ({requester, company, machine, department, assignee} : {requester: string, company: string, machine: string, department: string, assignee: string}) => {
    return (
        <div className={"w-1/6 h-[calc(100vh-50px)] bg-stone-300 flex flex-col items-center"}>

            <div className="flex flex-col">
                <div className="group flex flex-row justify-start py-2">
                    <div className={`flex flex-col items-start justify-center min-w-[50px]`}>
                        <h1 className="flex text-xl">Requestor</h1>
                        <input type="text" disabled value={requester}/>
                    </div>
                </div>
                <div className="group flex flex-row justify-start py-2">
                    <div className={`flex flex-col items-start justify-center min-w-[50px]`}>
                        <h1 className="flex text-xl">Company</h1>
                        <input type="text" disabled value={company}/>
                    </div>
                </div>
                <div className="group flex flex-row justify-start py-2">
                    <div className={`flex flex-col items-start justify-center min-w-[50px]`}>
                        <h1 className="flex text-xl">Machine</h1>
                        <input type="text" disabled value={machine}/>
                    </div>
                </div>
                <div className="group flex flex-row justify-start py-2">
                    <div className={`flex w-full flex-col items-start justify-center min-w-[50px]`}>
                        <h1 className="flex text-xl">Department</h1>
                        {2 == 1 ? (
                            <input type="text" disabled value={department}/>
                        ) : (
                            <select
                                id="role"
                                className="w-full">
                                <option value="0">{department}</option>
                            </select>
                        )}
                    </div>
                </div>
                <div className="group flex flex-row justify-start py-2">
                    <div className={`flex flex-col items-start justify-center min-w-[50px]`}>
                        <h1 className="flex text-xl">Assignee</h1>
                        <input type="text" disabled value={assignee}/>
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
