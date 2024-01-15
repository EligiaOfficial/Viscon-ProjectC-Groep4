import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { UserRoles } from "../UserRoles";
import { changeTicket, claimTicket, getDepartments } from "../Endpoints/Dto";
import { getName, getRole, getId } from "../Endpoints/Jwt";

import userIcon from "../assets/icons/user_alt.svg";
import userAddIcon from "../assets/icons/user.svg";
import companyIcon from "../assets/icons/company.svg";
import dateIcon from "../assets/icons/date.svg";
import departmentIcon from "../assets/icons/department.svg";
import publishedIcon from "../assets/icons/published.svg";
import statusIcon from "../assets/icons/status.svg";
import urgentIcon from "../assets/icons/urgent.svg";
import machineIcon from "../assets/icons/cogs.svg";
import { useTranslation } from "react-i18next";
import TicketSideBarItem from "./TicketSideBarItem";

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
  createdAt: Date;
}) {
  const { t } = useTranslation();

  const [departments, setDepartments] = useState<string[]>([]);
  const [newDepartment, setNewDepartment] = useState<string>("");

  const [urgency, setUrgency] = useState<boolean>(Boolean(urgent));
  const [publishedState, setPublished] = useState<boolean>(Boolean(published));
  const [resolvedState, setResolved] = useState<boolean>(Boolean(resolved));
  const [assigneeState, setAssignee] = useState(assignee);

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
    setAssignee(assignee);
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
      userid: parseInt(getId(token)),
      ticketid: TicketId,
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
      className={
        "w-1/5 h-full border-r-2 bg-white dark:bg-stone-500 flex flex-col items-center"
      }
    >
      <div className="flex flex-col gap-2 py-4">
        <TicketSideBarItem
          title={t("tickets.ticket.issuer")}
          subtitle={requester}
          icon={userIcon}
        />
        <TicketSideBarItem
          title={t("tickets.ticket.company")}
          subtitle={company}
          icon={companyIcon}
        />
        <TicketSideBarItem
          title={t("tickets.ticket.machine")}
          subtitle={machine}
          icon={machineIcon}
        />

        <hr />

        <div className="flex flex-row items-center gap-2">
          <img
            className={`min-w-[24px] max-w-[24px] min-h-[24px] max-h-[24px] dark:invert`}
            alt={""}
            src={urgentIcon}
          />
          <div className={`flex flex-col w-full min-w-[50px]`}>
            <h1 className="flex font-bold italic text-md">
              {t("tickets.ticket.urgent.title")}
            </h1>
            {role >= UserRoles.KEYUSER ? (
              <h1 className="text-md flex">
                {!urgent
                  ? t("tickets.ticket.urgent.no")
                  : t("tickets.ticket.urgent.yes")}
              </h1>
            ) : (
              <select
                className="w-auto bg-sky-100 dark:bg-stone-500 hover:bg-sky-200 dark:hover:bg-stone-400 outline-none rounded-md"
                onChange={(e) => setUrgency(stringToBoolean(e.target.value))}
              >
                {urgent ? (
                    <>
                      <option value="yes">{t("tickets.ticket.urgent.yes")}</option>
                      <option value="no">{t("tickets.ticket.urgent.no")}</option>
                    </>
                ) : (
                    <>
                      <option value="no">{t("tickets.ticket.urgent.no")}</option>
                      <option value="yes">{t("tickets.ticket.urgent.yes")}</option>
                    </>
                )}
              </select>
            )}
          </div>
        </div>

        <TicketSideBarItem
          title={t("tickets.ticket.created")}
          subtitle={formattedDate}
          icon={dateIcon}
        />

        <hr />

        <div className="flex flex-row items-center gap-2">
          <img
            className={`min-w-[24px] max-w-[24px] min-h-[24px] max-h-[24px] dark:invert`}
            alt={""}
            src={departmentIcon}
          />
          <div className={`flex flex-col w-full min-w-[50px]`}>
            <h1 className="flex font-bold italic text-md">
              {t("tickets.ticket.department")}
            </h1>
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
                    )
                )}
              </select>
            )}
          </div>
        </div>

        <div className="flex flex-row items-center gap-2">
          <img
            className={`min-w-[24px] max-w-[24px] min-h-[24px] max-h-[24px] dark:invert`}
            alt={""}
            src={userAddIcon}
          />
          <div className={`flex flex-col w-full min-w-[50px]`}>
            <h1 className="flex font-bold italic text-md">
              {t("tickets.ticket.assignee")}
            </h1>
            {role >= UserRoles.KEYUSER ? (
              <h1 className="text-md flex">{assigneeState}</h1>
            ) : (
              <h1 className="text-md flex">{assigneeState}</h1>
            )}
            {role <= UserRoles.VISCON ? (
              assigneeState == getName(token)[0] + " " + getName(token)[1] ? (
                ""
              ) : (
                <div
                  onClick={async () =>
                    await claimTicket(TicketId).then(setAssignee(name))
                  }
                  className={
                    "flex flex-row ml-5 text-blue-700 hover:text-purple-700 dark:text-gray-700 cursor-pointer dark:hover:text-orange-400"
                  }
                >
                  <img
                    className={`min-w-[24px] max-w-[24px] min-h-[24px] max-h-[24px] dark:invert`}
                    alt={""}
                    src={userIcon}
                  />
                  <h1>{t("tickets.ticket.assignSelf")}</h1>
                </div>
              )
            ) : (
              <div />
            )}
          </div>
        </div>

        <hr />

        <div className="flex flex-row items-center gap-2">
          <img
            className={`min-w-[24px] max-w-[24px] min-h-[24px] max-h-[24px] dark:invert`}
            alt={""}
            src={publishedIcon}
          />
          <div className={`flex flex-col w-full min-w-[50px]`}>
            <h1 className="flex font-bold italic text-md">
              {t("tickets.ticket.public.title")}
            </h1>
            {role >= UserRoles.KEYUSER ? (
              <h1 className="text-md flex">
                {published.toString() === "true"
                  ? t("tickets.ticket.public.yes")
                  : t("tickets.ticket.public.no")}
              </h1>
            ) : (
              <select
                className=" w-auto bg-sky-100 dark:bg-stone-500 hover:bg-sky-200 dark:hover:bg-stone-400 outline-none rounded-md"
                onChange={(e) => setPublished(stringToBoolean(e.target.value))}
              >
                {published.toString() == "true" ? (
                    <>
                      <option value="yes">{t("tickets.ticket.public.yes")}</option>
                      <option value="no">{t("tickets.ticket.public.no")}</option>
                    </>
                ) : (
                    <>
                      <option value="no">{t("tickets.ticket.public.no")}</option>
                      <option value="yes">{t("tickets.ticket.public.yes")}</option>
                    </>
                )}
              </select>
            )}
          </div>
        </div>

        <div className="flex flex-row items-center gap-2">
          <img
            className={`min-w-[24px] max-w-[24px] min-h-[24px] max-h-[24px] dark:invert`}
            alt={""}
            src={statusIcon}
          />
          <div className={`flex flex-col w-full min-w-[50px]`}>
            <h1 className="flex font-bold italic text-md">
              {t("tickets.ticket.status.title")}
            </h1>
            {role >= UserRoles.KEYUSER ? (
              <h1 className="text-md flex">
                {resolved.toString() !== "false"
                  ? t("tickets.ticket.status.open")
                  : t("tickets.ticket.status.closed")}
              </h1>
            ) : (
              <select
                className="w-auto bg-sky-100 dark:bg-stone-500 hover:bg-sky-200 dark:hover:bg-stone-400 outline-none rounded-md"
                onChange={(e) => setResolved(stringToBoolean(e.target.value))}
              >
                {resolved.toString() == "false" ? (
                    <>
                      <option value="no">{t("tickets.ticket.status.open")}</option>
                      <option value="yes">{t("tickets.ticket.status.closed")}</option>
                    </> 
                ) : (
                    <>
                      <option value="yes">{t("tickets.ticket.status.closed")}</option>
                      <option value="no">{t("tickets.ticket.status.open")}</option>
                    </>
                )}
              </select>
            )}
          </div>
        </div>

        {role == UserRoles.ADMIN || role == UserRoles.VISCON ? (
          <button
            type="submit"
            className="my-5 mx-auto flex w-5/6 justify-center rounded-md bg-blue-700 dark:bg-gray-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-800 dark:hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            {t("tickets.ticket.update")}
          </button>
        ) : (
          <></>
        )}
      </div>
    </form>
  );
}

export default TicketInfo;
