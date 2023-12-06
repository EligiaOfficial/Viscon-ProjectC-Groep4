import {useEffect, useState} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";
import {UserRoles} from "../UserRoles";
import {changeTicket, claimTicket, getDepartments} from "../Endpoints/Dto";
import {getName, getRole} from "../Endpoints/Jwt";

function TicketInfo({
  requester,
  company,
  machine,
  department,
  assignee,
  urgent,
  published,
  resolved,
}: {
  requester: string;
  company: string;
  machine: string;
  department: string;
  assignee: string;
  urgent: boolean;
  published: boolean;
  resolved: boolean;
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

  useEffect(() => {
    if (role >= UserRoles.USER) return;

    getDepartments().then((res) => {
      setDepartments(res.data);
    });
  }, [urgent, published, resolved]);

  const stringToBoolean = (stringValue) => {
    switch (stringValue?.toLowerCase()?.trim()) {
      case "true":
        return true;

      case "false":
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
  const name = getName(token);
  
  return (
    <form
      onSubmit={handleSubmit}
      className={"w-2/12 h-full bg-stone-300 dark:bg-stone-500 flex flex-col items-center"}
    >
      <div className="flex flex-col">
        <div className="group flex flex-row justify-start py-2">
          <div
            className={`flex w-full flex-col items-start justify-center min-w-[50px]`}
          >
            <h1 className="flex text-xl">Requestor</h1>
            <input
              type="text"
              className={"w-full"}
              disabled
              value={requester}
            />
          </div>
        </div>
        <div className="group flex flex-row justify-start py-2">
          <div
            className={`flex w-full flex-col items-start justify-center min-w-[50px]`}
          >
            <h1 className="flex text-xl">Company</h1>
            <input type="text" className={"w-full "} disabled value={company} />
          </div>
        </div>
        <div className="group flex flex-row justify-start py-2">
          <div
            className={`flex w-full flex-col items-start justify-center min-w-[50px]`}
          >
            <h1 className="flex text-xl">Machine</h1>
            <input type="text" className={"w-full"} disabled value={machine} />
          </div>
        </div>

        <div className="group flex flex-row justify-start py-2">
          <div
            className={`flex w-full flex-col items-start justify-center min-w-[50px]`}
          >
            <h1 className="flex text-xl">Urgancy</h1>
            {role >= UserRoles.KEYUSER ? (
              <input
                type="text"
                className={"w-full"}
                disabled
                value={!urgent ? "No" : "Yes"}
              />
            ) : (
              <select
                className="w-[197px] mx-auto hover:bg-white"
                onChange={(e) => setUrgency(stringToBoolean(e.target.value))}
              >
                <option value={urgent.toString() === "true" ? "true" : "false"}>
                  {urgent.toString() === "true" ? "True" : "False"}
                </option>
                <option value={urgent.toString() !== "true" ? "true" : "false"}>
                  {urgent.toString() !== "true" ? "True" : "False"}
                </option>
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
              <input type="text" disabled value={department} />
            ) : (
              <select
                className="w-[197px] mx-auto hover:bg-white"
                onChange={(e) => setNewDepartment(e.target.value)}
              >
                <option value="">{department}</option>
                {departments.map(
                  (dep) =>
                    department !== dep["speciality"] && (
                      <option key={dep["id"]} value={dep["id"]}>
                        {dep["speciality"]}
                      </option>
                    )
                )}
              </select>
            )}
          </div>
        </div>
        
        
        <div className="group flex flex-row justify-start py-2">
          <div
            className={`flex w-full flex-col items-start justify-center min-w-[50px]`}
          >
            <h1 className="flex text-xl">Assignee</h1>
            <input type="text" className={"w-full"} disabled value={assigneeState} />
            { role <= UserRoles.VISCON ? (
                <div
                    onClick={async () => await claimTicket(TicketId).then(setAssignee(name))}
                    type="submit"
                    className="my-5 mx-auto flex w-5/6 justify-center rounded-md bg-gray-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                >
                  Claim Ticket
                </div>
            ):(
                <div/>
            ) }
          </div>
        </div>
      </div>

      <div className="w-[200px] flex flex-col mt-auto">
        <div className="group flex flex-row justify-start">
          <div className={`w-[200px] flex items-center justify-between`}>
            <span className="text-xl">Publish Ticket</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                value=""
                className="sr-only peer"
                onChange={(e) => setPublished(!publishedState)}
                checked={publishedState}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600" />
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
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600" />
            </label>
          </div>
        </div>
        {role == UserRoles.ADMIN || role == UserRoles.VISCON ? (
          <button
            type="submit"
            className="my-5 mx-auto flex w-5/6 justify-center rounded-md bg-gray-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
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
