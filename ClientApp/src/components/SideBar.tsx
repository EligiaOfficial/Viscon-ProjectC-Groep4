import { useState } from "react";
import { getRole } from "../Endpoints/Jwt";
import { useNavigate } from "react-router-dom";
import SideBarItem from "./SideBarItem";
import HamburgerButton from "./HamburgerButton";
import { UserRoles } from "../UserRoles";
import UserSettings from "../pages/UserSettings";
import dashboardIcon from "../assets/home.svg";
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
  const [showSettings, setShowSettings] = useState(false);
  const nav = useNavigate();
  const token = localStorage.getItem("token");
  const Role = getRole(token);

  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };

  return (
    <div
      className={`${
        menu
          ? showSettings
            ? "w-[600px] bg-gray-800"
            : "w-[250px] bg-blue-600"
          : showSettings
          ? "w-[600px] bg-gray-800"
          : "w-[50px] bg-blue-600"
      } min-w-[50px] relative z-10 translate duration-300 flex flex-col gap-10 h-full bg-blue-500 overflow-hidden`}
    >
      <HamburgerButton onclick={() => setMenu(!menu)} state={menu} />
      <div className="flex flex-col mt-24">
        <SideBarItem
          title={"Dashboard"}
          icon={dashboardIcon}
          onclick={() => nav("/dashboard")}
          transformAnimation={"rotate3d(0,1,0,180deg)"}
        />
        <SideBarItem
          title={"Tickets"}
          icon={normalIcon}
          onclick={() => nav("/tickets")}
          transformAnimation={"rotate3d(0,1,0,180deg"}
        />
      </div>
      <div className="flex flex-col">
        <SideBarItem
          title={"Archive"}
          icon={archiveIcon}
          transformAnimation={"rotate3d(0,1,0,180deg"}
        />
        <SideBarItem
          title={"New"}
          icon={newIcon}
          transformAnimation={"rotate3d(0,1,0,180deg"}
        />
        <SideBarItem
          title={"Critical"}
          icon={criticalIcon}
          transformAnimation={"rotate(360deg)"}
        />
      </div>
      <div className="flex flex-col">
        {Role == UserRoles.ADMIN ||
        Role == UserRoles.KEYUSER ||
        Role == UserRoles.VISCON ? (
          <SideBarItem
            title={"Add Ticket"}
            icon={ticketIcon}
            onclick={() => nav("/create")}
            transformAnimation={"rotate(90deg)"}
          />
        ) : (
          <div />
        )}
        {Role == UserRoles.ADMIN || Role == UserRoles.KEYUSER ? (
          <SideBarItem
            title={"Add User"}
            icon={userIcon}
            onclick={() => nav("/add")}
            transformAnimation={"rotate3d(0,1,0,180deg"}
          />
        ) : (
          <div />
        )}
      </div>
      <div className="mt-auto">
        <SideBarItem
          title={"Settings"}
          icon={settingsIcon}
          transformAnimation={"rotate(360deg)"}
          onclick={() => setShowSettings(!showSettings)}
        />
        {showSettings && <UserSettings toggleSettings={toggleSettings} />}
        <SideBarItem
          title={"Logout"}
          icon={logoutIcon}
          onclick={() => nav("/logout")}
          transformAnimation={"rotate3d(0,1,0,180deg"}
        />
      </div>
    </div>
  );
}

export default SideBar;
