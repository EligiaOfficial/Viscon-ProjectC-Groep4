import {useEffect, useState} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";
import {UserRoles} from "../UserRoles";
import {changeTicket, claimTicket, getDepartments} from "../Endpoints/Dto";
import {getName, getRole} from "../Endpoints/Jwt";

import userIcon from "../assets/icons/user_alt.svg";
import userAddIcon from "../assets/icons/user.svg";
import companyIcon from "../assets/icons/company.svg";
import dateIcon from "../assets/icons/date.svg";
import departmentIcon from "../assets/icons/department.svg";
import publishedIcon from "../assets/icons/published.svg";
import statusIcon from "../assets/icons/status.svg";
import urgentIcon from "../assets/icons/urgent.svg";
import machineIcon from "../assets/icons/cogs.svg";

function TicketInfo({
  requester,
  company,
  machine,
  department,
  assignee,
  urgent,
  published,
  resolved,
  createdAt,
}: {
  requester: string;
  company: string;
  machine: string;
  department: string;
  assignee: string;
  urgent: boolean;
  published: boolean;
  resolved: boolean;
  createdAt: Date,
}) {
  
  const [departments, setDepartments] = useState<string[]>([]);
  const [newDepartment, setNewDepartment] = useState<string>("");

  const [urgency, setUrgency] = useState<boolean>(Boolean(urgent));
  const [publishedState, setPublished] = useState<boolean>(Boolean(published));
  const [resolvedState, setResolved] = useState<boolean>(Boolean(resolved));
  const [assigneeState, setAssignee] = useState(assignee)
  
  const [searchParams] = useSearchParams();
  const Id = searchParams.get("id") || " ";
  const TicketId = parseInt(Id, 10);
  if (isNaN(TicketId)) {
    return <div>Invalid Ticket</div>;
  }

  const formattedDate = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  }).format(new Date(createdAt));

  useEffect(() => {
    if (role >= UserRoles.USER) return;

    getDepartments().then((res) => {
      setDepartments(res.data);
    });
    setAssignee(assignee)
  }, [urgent, published, resolved, assignee]);

  const stringToBoolean = (stringValue) => {
    switch (stringValue?.toLowerCase()?.trim()) {
      case "true":
      case "yes":  
        return true;

      case "false":
      case "no":  
        return false;

      default:
        throw Error;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    changeTicket({
      id: +TicketId,
      department: +newDepartment,
      urgent: urgency,
      resolved: resolvedState,
      publish: publishedState,
    }).then((res) => {
      console.log(res);
    });
  };

  const token = localStorage.getItem("token");
  const role = getRole(token);
  const name = getName(token)[0] + " " + getName(token)[1];
  
  return (
    <form
      onSubmit={handleSubmit}
      className={"w-1/5 h-full border-r-2 bg-white dark:bg-stone-500 flex flex-col items-center"}
    >
      <div className="flex flex-col">
        
        <div className="group flex flex-row justify-start py-2 mt-2.5">
          <div className={`flex flex-col w-full min-w-[50px]`}>
            <div className={"flex flex-row items-center justify-start"}>
              <img
                  className={`min-w-[24px] max-w-[24px] min-h-[24px] max-h-[24px] dark:invert`}
                  alt={""}
                  src={userIcon}
              />
              <h1 className="flex font-bold italic text-md">Requestor</h1>
            </div>
            <div className={"flex w-full flex-row items-center ml-6"}>
              {/*<img*/}
              {/*    className={`min-w-[24px] max-w-[24px] min-h-[24px] max-h-[24px] dark:invert`}*/}
              {/*    alt={""}*/}
              {/*    src={userIcon}*/}
              {/*/>*/}
              <h1 className="text-md flex">{requester}</h1>
            </div>
          </div>
        </div>

        <div className="group flex flex-row justify-start py-2">
          <div className={`flex flex-col w-full min-w-[50px]`}>
            <div className={"flex flex-row items-center justify-start"}>
              <img
                  className={`min-w-[24px] max-w-[24px] min-h-[24px] max-h-[24px] dark:invert`}
                  alt={""}
                  src={companyIcon}
              />
              <h1 className="flex font-bold italic text-md">Company</h1>
            </div>
            <div className={"flex w-full flex-row items-center ml-6"}>
              <h1 className="text-md flex">{company}</h1>
            </div>
          </div>
        </div>

        <div className="group flex flex-row justify-start py-2">
          <div className={`flex flex-col w-full min-w-[50px]`}>
            <div className={"flex flex-row items-center justify-start"}>
              <img
                  className={`min-w-[24px] max-w-[24px] min-h-[24px] max-h-[24px] dark:invert`}
                  alt={""}
                  src={machineIcon}
              />
              <h1 className="flex font-bold italic text-md">Machine</h1>
            </div>
            <div className={"flex w-full flex-row items-center ml-6"}>
              <h1 className="text-md flex">{machine}</h1>
            </div>
          </div>
        </div>
        
        <hr/>

        <div className="group flex flex-row justify-start py-2">
          <div className={`flex flex-col w-full min-w-[50px]`}>
            <div className={"flex flex-row items-center justify-start"}>
              <img
                  className={`min-w-[24px] max-w-[24px] min-h-[24px] max-h-[24px] dark:invert`}
                  alt={""}
                  src={urgentIcon}
              />
              <h1 className="flex font-bold italic text-md">Urgent</h1>
            </div>
            <div className={"flex w-full flex-row items-center ml-6"}>
              {role >= UserRoles.KEYUSER ? (
                  <h1 className="text-md flex">{!urgent ? "No" : "Yes"}</h1>
              ) : (
                <select
                    className="w-auto bg-sky-100 dark:bg-stone-500 hover:bg-sky-200 dark:hover:bg-stone-400"
                      onChange={(e) => setUrgency(stringToBoolean(e.target.value))}
                  >
                    <option value={urgent.toString() === "true" ? "Yes" : "No"}>
                      {urgent.toString() === "true" ? "Yes" : "No"}
                    </option>
                    <option value={urgent.toString() !== "true" ? "Yes" : "No"}>
                      {urgent.toString() !== "true" ? "Yes" : "No"}
                    </option>
                  </select>
              )}
            </div>
          </div>
        </div>

        <div className="group flex flex-row justify-start py-2">
          <div className={`flex flex-col w-full min-w-[50px]`}>
            <div className={"flex flex-row items-center justify-start"}>
              <img
                  className={`min-w-[24px] max-w-[24px] min-h-[24px] max-h-[24px] dark:invert`}
                  alt={""}
                  src={dateIcon}
              />
              <h1 className="flex font-bold italic text-md">Created At</h1>
            </div>
            <div className={"flex w-full flex-row items-center ml-6"}>
              <h1 className="text-md flex">{formattedDate}</h1>
            </div>
          </div>
        </div>

        <hr/>

        <div className="group flex flex-row justify-start py-2">
          <div className={`flex flex-col w-full min-w-[50px]`}>
            <div className={"flex flex-row items-center justify-start"}>
              <img
                  className={`min-w-[24px] max-w-[24px] min-h-[24px] max-h-[24px] dark:invert`}
                  alt={""}
                  src={departmentIcon}
              />
              <h1 className="flex font-bold italic text-md">Department</h1>
            </div>
            <div className={"flex w-full flex-row items-center ml-6"}>
              {role >= UserRoles.KEYUSER ? (
                  <h1 className="text-md flex">{department}</h1>
              ) : (
                <select
                    className="w-auto bg-sky-100 dark:bg-stone-500 hover:bg-sky-200 dark:hover:bg-stone-400"
                  onChange={(e) => setNewDepartment(e.target.value)}
                >
                  <option className="">{department}</option>
                  {departments.map(
                    (dep) =>
                    department !== dep["speciality"] && (
                  <option key={dep["id"]} value={dep["id"]}>
                    {dep["speciality"]}
                  </option>
                ))}
                </select>          
              )}
            </div>
          </div>
        </div>

        <div className="group flex flex-row justify-start py-2 ">
          <div className={`flex flex-col w-full min-w-[50px]`}>
            <div className={"flex flex-row items-center justify-start"}>
              <img
                  className={`min-w-[24px] max-w-[24px] min-h-[24px] max-h-[24px] dark:invert`}
                  alt={""}
                  src={userAddIcon}
              />
              <h1 className="flex font-bold italic text-md">Assignee</h1>
            </div>
            <div className={"flex w-full flex-row items-center ml-6"}>
              {role >= UserRoles.KEYUSER ? (
                  <h1 className="text-md flex">{assigneeState}</h1>
              ) : (
                  <h1 className="text-md flex">{assigneeState}</h1>
              )}
            </div>
            { role <= UserRoles.VISCON ? (
                
                <div
                    onClick={async () => await claimTicket(TicketId).then(setAssignee(name))}
                    type="submit"
                    className={"flex flex-row ml-5 text-blue-700 hover:text-purple-700 dark:text-gray-700 cursor-pointer dark:hover:text-orange-400"}
                >
                  <img
                      className={`min-w-[24px] max-w-[24px] min-h-[24px] max-h-[24px] dark:invert`}
                      alt={""}
                      src={userIcon}
                  />
                  <h1>{ assigneeState === 'Unassigned' ? "Claim Ticket" : "Take Ticket" }</h1>
                </div>
            ):(
                <div/>
            ) }
          </div>
        </div>

        <hr/>

        <div className="group flex flex-row justify-start py-2">
          <div className={`flex flex-col w-full min-w-[50px]`}>
            <div className={"flex flex-row items-center justify-start"}>
              <img
                  className={`min-w-[24px] max-w-[24px] min-h-[24px] max-h-[24px] dark:invert`}
                  alt={""}
                  src={publishedIcon}
              />
              <h1 className="flex font-bold italic text-md">Public</h1>
            </div>
            <div className={"flex w-full flex-row items-center ml-6"}>
              {role >= UserRoles.KEYUSER ? (
                  <h1 className="text-md flex">{published.toString() === "true" ? "Yes" : "No"}</h1>
              ) : (
                <select
                    className="w-auto bg-sky-100 dark:bg-stone-500 hover:bg-sky-200 dark:hover:bg-stone-400"
                      onChange={(e) => setPublished(stringToBoolean(e.target.value))}
                  >
                    <option value={published.toString() === "true" ? "Yes" : "No"}>
                      {published.toString() === "true" ? "Yes" : "No"}
                    </option>
                    <option value={published.toString() !== "true" ? "Yes" : "No"}>
                      {published.toString() !== "true" ? "Yes" : "No"}
                    </option>
                  </select>
              )}
            </div>
          </div>
        </div>

        <div className="group flex flex-row justify-start py-2">
          <div className={`flex flex-col w-full min-w-[50px]`}>
            <div className={"flex flex-row items-center justify-start"}>
              <img
                  className={`min-w-[24px] max-w-[24px] min-h-[24px] max-h-[24px] dark:invert`}
                  alt={""}
                  src={statusIcon}
              />
              <h1 className="flex font-bold italic text-md">Status</h1>
            </div>
            <div className={"flex w-full flex-row items-center ml-6"}>
              {role >= UserRoles.KEYUSER ? (
                  <h1 className="text-md flex">{resolved.toString() !== 'false' ? "Closed" : "Open"}</h1>
              ) : (
                <select
                      className="w-auto bg-sky-100 dark:bg-stone-500 hover:bg-sky-200 dark:hover:bg-stone-400"
                      onChange={(e) => setResolved(stringToBoolean(e.target.value))}
                  >
                    <option value={resolved.toString() === "true" ? "yes" : "no"}>
                      {resolved.toString() === "true" ? "Closed" : "Open"}
                    </option>
                    <option value={resolved.toString() !== "true" ? "yes" : "no"}>
                      {resolved.toString() !== "true" ? "Closed" : "Open"}
                    </option>
                  </select>
              )}
            </div>
          </div>
        </div>
        
        {role == UserRoles.ADMIN || role == UserRoles.VISCON ? (
            <button
                type="submit"
                className="my-5 mx-auto flex w-5/6 justify-center rounded-md bg-blue-700 dark:bg-gray-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-800 dark:hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              Update Ticket
            </button>
        ) : (
            <></>
        )}
      </div>
    </form>
  );
}

export default TicketInfo;
