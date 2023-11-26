import { useState } from "react";
import { getRole } from "../Endpoints/Jwt";
import { useNavigate } from "react-router-dom";
import SideBarItem from "./SideBarItem";
import defaultIcon from "../assets/default-dashboard-icon.svg";
import HamburgerButton from "./HamburgerButton";
import { UserRoles } from "../UserRoles";
import homeIcon from "../assets/home.svg";
import ticketIcon from "../assets/ticket.svg";
import archiveIcon from "../assets/archive.svg";
import newIcon from "../assets/new.svg";
import criticalIcon from "../assets/critical.svg";
import normalIcon from "../assets/normal.svg";
import userIcon from "../assets/user.svg";
import settingsIcon from "../assets/settings.svg";
import logoutIcon from "../assets/logout.svg";

function SideBar() {
  const [menu, setMenu] = useState<boolean>(false);
  const nav = useNavigate();
  const token = localStorage.getItem("token");
  const Role = getRole(token);

  return (
    <div
      className={`${
        menu ? "w-[250px]" : "w-[50px]"
      } min-w-[50px] relative z-10 translate duration-300 flex flex-col gap-10 h-full bg-blue-500 overflow-hidden`}
    >
      <HamburgerButton onclick={() => setMenu(!menu)} state={menu} />
      <div className="flex flex-col">
        <SideBarItem
          title={"Dashboard"}
          icon={homeIcon}
          onclick={() => nav("/dashboard")}
          animation={"scale-x-[-1]"}
        />
        <SideBarItem
          title={"Create Ticket"}
          icon={ticketIcon}
          onclick={() => nav("/create")}
          animation={"scale-x-[-1]"}
        />
        <SideBarItem
          title={"Archive"}
          icon={archiveIcon}
          animation={"scale-x-[-1]"}
        />
        <SideBarItem title={"New"} icon={newIcon} animation={"scale-x-[-1]"} />
        <SideBarItem
          title={"Critical"}
          icon={criticalIcon}
          animation={"scale-x-[-1]"}
        />
        <SideBarItem
          title={"Normal"}
          icon={normalIcon}
          animation={"scale-x-[-1]"}
        />
        {Role == UserRoles.ADMIN || Role == UserRoles.KEYUSER ? (
          <SideBarItem
            title={"Add User"}
            icon={userIcon}
            onclick={() => nav("/add")}
            animation={"scale-x-[-1]"}
          />
        ) : (
          <div />
        )}
      </div>
      <div className="mt-auto">
        <SideBarItem
          title={"Settings"}
          icon={settingsIcon}
          animation={"rotate-45"}
        />
        <SideBarItem
          title={"Logout"}
          icon={logoutIcon}
          onclick={() => nav("/logout")}
          animation={"scale-x-[-1]"}
        />
      </div>
    </div>
  );
}

export default SideBar;
