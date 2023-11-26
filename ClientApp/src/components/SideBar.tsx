import {useState} from "react";
import {getRole} from "../Endpoints/Jwt";
import {useNavigate} from "react-router-dom";
import SideBarItem from "./SideBarItem";
import HamburgerButton from "./HamburgerButton";
import {UserRoles} from "../UserRoles";
import UserSettings from "../pages/UserSettings";

import defaultIcon from "../assets/default-dashboard-icon.svg";
import archiveIcon from "../assets/archive-icon.svg";
import homeIcon from "../assets/home-icon.svg";
import ticketIcon from "../assets/ticket-icon.svg";
import userIcon from "../assets/new-user-icon.svg";
import settingsIcon from "../assets/settings-icon.svg";
import logoutIcon from "../assets/log-out-icon.svg";

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
        menu ? showSettings ? "w-[600px] bg-gray-800" : "w-[200px] bg-blue-500" : showSettings ? "w-[600px] bg-gray-800" : "w-[50px] bg-blue-500"
      } relative z-10 translate duration-300 flex flex-col gap-10 h-full overflow-hidden`}
    >
      <HamburgerButton onclick={() => setMenu(!menu)} state={menu} />
      <div className="flex flex-col">
        <SideBarItem
          title={"Dashboard"}
          icon={homeIcon}
          onclick={() => nav("/dashboard")}
        />
        <SideBarItem
          title={"Create Ticket"}
          icon={ticketIcon}
          onclick={() => nav("/create")}
        />
        <SideBarItem title={"Archive"} icon={archiveIcon} />
        <SideBarItem title={"New"} icon={defaultIcon} />
        <SideBarItem title={"Critical"} icon={defaultIcon} />
        <SideBarItem title={"Normal"} icon={defaultIcon} />
      </div>
      <div className="mt-auto">
        {Role == UserRoles.ADMIN ||
         Role == UserRoles.KEYUSER ? (
            <SideBarItem 
                title={"Add User"} 
                icon={userIcon} 
                onclick={() => nav('/add')}
            />
        ) : (
          <div />
        )}
        <SideBarItem title={'Settings'} icon={settingsIcon} onclick={() => setShowSettings(!showSettings)} />
        {showSettings && <UserSettings toggleSettings={toggleSettings} />}
        <SideBarItem
          title={"Logout"}
          icon={logoutIcon}
          onclick={() => nav("/logout")}
        />
      </div>
    </div>
  );
}

export default SideBar;
