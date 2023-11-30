/*
 *   Copyright (c) 2023
 *   All rights reserved.
 */
import {useSearchParams} from "react-router-dom";

import {getId, getRole} from "../Endpoints/Jwt";
import RoundButton from "../components/RoundButton";
import {
  changeTicket,
  createMessageAxios,
  FetchTicketAxios,
  getDepartments
} from "../Endpoints/Dto";
import {useEffect, useState} from "react";
import Layout from "../components/Layout";
import {UserRoles} from "../UserRoles";

const Ticket = () => {
  const [searchParams] = useSearchParams();
  const Id = searchParams.get("id") || " ";
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

  const fetchTicket = async () => {
    await FetchTicketAxios(TicketId)
      .then((res) => {
        const {
          company,
          creator,
          department,
          helper,
          machine,
          messages,
          ticket,
        } = res.data;
        setCompany(company);
        setCreator(creator);
        setDepartment(department);
        setHelper(helper);
        setMachine(machine);
        setMessages(messages);
        setTicket(ticket);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchTicket();
  }, []);

  return (
    <>
      <Layout>
        {ticket["urgent"] !== undefined ? (
            <TicketInfo
                assignee={helper}
                company={company}
                department={department}
                machine={machine}
                requester={creator}
                urgent={ticket["urgent"]}
                published={ticket["published"]}
                resolved={ticket["resolved"]}
            />
        ) : null}
        <div className="bg-stone-200 h-full w-full">
          <section className="flex h-full overflow-y-auto">
            <TicketChat ticket={ticket} messages={messages || []} />
          </section>
        </div>
      </Layout>
    </>
  );
};

export default Ticket;

const TicketChat = ({
  ticket,
  messages,
}: {
  ticket: object;
  messages: object[];
}) => {
  const [searchParams] = useSearchParams();
  const Id = searchParams.get("id") || " ";
  const TicketId = parseInt(Id, 10);

  const [content, setMsg] = useState("");
  const [img] = useState("");
  const token = localStorage.getItem("token");

  const submitMessage = (e) => {
    e.preventDefault(); // TODO: Reload Chat ipv Page
    console.log("msg: " + content);

    if (content !== "") {
      createMessageAxios({
        content: content,
        ticketId: +TicketId,
        sender: +getId(token),
      })
        .then(() => {
          console.log(content, img);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

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
            <textarea
              id="message"
              rows="4"
              onChange={(e) => setMsg(e.target.value)}
              className="block p-2.5 w-full text-sm text-gray-900 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Write your thoughts here..."
            />
          </div>
          <form className={"w-11/12 mx-auto"} onSubmit={submitMessage}>
            <label
              className="block mb-2 text-sm dark:text-white"
              htmlFor="file_input"
            >
              <p className={"font-medium text-gray-900"}>Upload File(s)</p>
            </label>
            <input
              className="block w-full text-sm text-gray-900 border rounded-lg
                            cursor-pointer
                            dark:border-gray-600 dark:placeholder-gray-400"
              id="multiple_files"
              type="file"
              multiple
            />
            <div className={"flex flex-row justify-between"}>
              <p className={"font-medium text-gray-900"}>SVG, PNG or JPG</p>
              <button
                type="submit"
                className="flex justify-center rounded-md bg-gray-600 px-3 py-1.5 mx-1.5 my-2.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                Submit
              </button>
            </div>
          </form>
        </div>

        {messages.length > 0 ? (
          <div className="md:w-3/4 w-full border rounded-lg mt-2.5 bg-white">
            <div className="mx-10">
              {messages.map((message, index) => (
                <ChatField
                  key={index}
                  message={message["content"]}
                  user={message["sender"]}
                  timestamp={message["timeSent"]}
                />
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
};

let ChatField = ({
  user,
  message,
  timestamp,
}: {
  user: string;
  message: string;
  timestamp: string;
}) => {
  const date = new Date(timestamp);
  const formattedDate = new Intl.DateTimeFormat("en-GB", {
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
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
      <hr className="h-[2px] mt-5 bg-gray-200 border-0 dark:bg-gray-700" />
    </div>
  );
};

const TicketInfo = ({
                            requester, company, machine, department, assignee, urgent, published, resolved
                          }: {
  requester: string;
  company: string;
  machine: string;
  department: string;
  assignee: string;
  urgent: boolean;
  published: boolean;
  resolved: boolean;
}) => {

  const [departments, setDepartments] = useState<string[]>([]);
  const [newDepartment, setNewDepartment] = useState<string>("");

  const [urgency, setUrgency] = useState<boolean>(Boolean(urgent));
  const [publishedState, setPublished] = useState<boolean>(Boolean(published));
  const [resolvedState, setResolved] = useState<boolean>(Boolean(resolved));


  const [searchParams] = useSearchParams();
  const Id = searchParams.get("id") || " ";
  const TicketId = parseInt(Id, 10);
  if (isNaN(TicketId)) {
    return <div>Invalid Ticket</div>;
  }
  
  useEffect(() => {
    if (role >= UserRoles.USER) return;
    
    getDepartments()
        .then(res => {
          setDepartments(res.data);
        });
    console.log(urgent, published, resolved)
    console.log(urgency, publishedState, resolvedState)
  }, [urgent, published, resolved]);

  const stringToBoolean = (stringValue) => {
    switch(stringValue?.toLowerCase()?.trim()){
      case "true":
        return true;

      case "false":
        return false;

      default:
        throw Error;
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    changeTicket({
      id: +TicketId,
      department: +newDepartment,
      urgent: urgency,
      resolved: resolvedState,
      publish: publishedState,
    }).then(res => {
          console.log(res)
        }
    );
  }

  const role = getRole(localStorage.getItem("token"));
  return (
      <form onSubmit={handleSubmit}
            className={
              "w-2/12 h-[calc(100vh-50px)] bg-stone-300 flex flex-col items-center"
            }
      >
        <div className="flex flex-col">
          <div className="group flex flex-row justify-start py-2">
            <div
                className={`flex w-full flex-col items-start justify-center min-w-[50px]`}
            >
              <h1 className="flex text-xl">Requestor</h1>
              <input type="text" className={"w-full"} disabled value={requester}/>
            </div>
          </div>
          <div className="group flex flex-row justify-start py-2">
            <div
                className={`flex w-full flex-col items-start justify-center min-w-[50px]`}
            >
              <h1 className="flex text-xl">Company</h1>
              <input type="text" className={"w-full "} disabled value={company}/>
            </div>
          </div>
          <div className="group flex flex-row justify-start py-2">
            <div
                className={`flex w-full flex-col items-start justify-center min-w-[50px]`}
            >
              <h1 className="flex text-xl">Machine</h1>
              <input type="text" className={"w-full"} disabled value={machine}/>
            </div>
          </div>


          <div className="group flex flex-row justify-start py-2">
            <div
                className={`flex w-full flex-col items-start justify-center min-w-[50px]`}
            >
              <h1 className="flex text-xl">Urgancy</h1>
              {role >= UserRoles.KEYUSER ? (
                  <input type="text" className={"w-full"} disabled value={!urgent ? "No" : "Yes"}/>
              ) : (
                  <select
                      id="role"
                      className="w-[197px] mx-auto hover:bg-white"
                      onChange={(e) => setUrgency(stringToBoolean(e.target.value))}
                  >
                    <option
                        value={urgent.toString() === 'true' ? "true" : "false"}>{urgent.toString() === 'true' ? "True" : "False"}</option>
                    <option
                        value={urgent.toString() !== 'true' ? "true" : "false"}>{urgent.toString() !== 'true' ? "True" : "False"}</option>
                  </select>
              )}
            </div>
          </div>


          <div className="group flex flex-row justify-start py-2">
            <div
                className={`flex w-full flex-col items-start justify-center min-w-[50px]`}
            >
              <h1 className="flex text-xl">Department</h1>
              {role >= UserRoles.KEYUSER ? (
                  <input type="text" disabled value={department}/>
              ) : (
                  <select id="role" className="w-[197px] mx-auto hover:bg-white"
                          onChange={(e) => setNewDepartment(e.target.value)}>
                    <option value="">{department}</option>
                    {departments.map((dep) => (
                        department !== dep["speciality"] && (
                            <option key={dep["id"]} value={dep["id"]}>
                              {dep["speciality"]}
                            </option>
                        )
                    ))}
                  </select>
              )}
            </div>
          </div>
          <div className="group flex flex-row justify-start py-2">
            <div
                className={`flex w-full flex-col items-start justify-center min-w-[50px]`}
            >
              <h1 className="flex text-xl">Assignee</h1>
              <input type="text" className={"w-full"} disabled value={assignee}/>
            </div>
          </div>
        </div>

        <div className="w-[200px] flex flex-col mt-auto">
          <div className="group flex flex-row justify-start">
            <div className={`w-[200px] flex items-center justify-between`}>
              <span className="text-xl">Publish Ticket</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox"
                       value=""
                       className="sr-only peer"
                       onChange={(e) => setPublished(!publishedState)}
                       checked={publishedState}
                />
                <div
                    className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"/>
              </label>
            </div>
          </div>
          <div className="group flex flex-row justify-start">
            <div className={`w-[200px] flex items-center justify-between`}>
              <span className="text-xl">Resolved</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                    type="checkbox"
                    value=""
                    className="sr-only peer"
                    onChange={(e) => setResolved(!resolvedState)}
                    checked={resolvedState}
                />
                <div
                    className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"/>
              </label>
            </div>
          </div>
          {role == UserRoles.ADMIN ||
          role == UserRoles.VISCON ? (
              <button type="submit"
                      className="my-5 mx-auto flex w-5/6 justify-center rounded-md bg-gray-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">
                Update Ticket
              </button>
          ) : (
              <></>
          )}
        </div>
      </form>
  );
};
