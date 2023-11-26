import { useState } from "react";
import { getRole } from "../Endpoints/Jwt";
import { useNavigate } from "react-router-dom";
import SideBarItem from "./SideBarItem";
import defaultIcon from "../assets/default-dashboard-icon.svg";
import HamburgerButton from "./HamburgerButton";

function SideBar() {
  const [menu, setMenu] = useState<boolean>(false);
  const nav = useNavigate();
  const token = localStorage.getItem("token");
  const UserRoles = getRole(token);
  function navToAddAccount() {
    nav("/add");
  }

  return (
    <div
      className={`${
        menu ? "w-[200px]" : "w-[50px]"
      } relative z-10 translate duration-300 flex flex-col gap-10 h-full bg-blue-500 overflow-hidden`}
    >
      <HamburgerButton onclick={() => setMenu(!menu)} state={menu} />
      <div className="flex flex-col">
        <SideBarItem
          title={"Dashboard"}
          icon={defaultIcon}
          onclick={() => nav("/dashboard")}
        />
        <SideBarItem
          title={"Create Ticket"}
          icon={defaultIcon}
          onclick={() => nav("/create")}
        />
        <SideBarItem
          title={"Add User"}
          icon={defaultIcon}
          onclick={() => nav("/add")}
        />
        <SideBarItem title={"Archive"} icon={defaultIcon} />
        <SideBarItem title={"New"} icon={defaultIcon} />
        <SideBarItem title={"Critical"} icon={defaultIcon} />
        <SideBarItem title={"Normal"} icon={defaultIcon} />
      </div>
      <div className="mt-auto">
        {getRole(token) == UserRoles.ADMIN ||
        getRole(token) == UserRoles.KEYUSER ? (
          <div
            className="group flex flex-row justify-start py-2 cursor-pointer"
            onClick={navToAddAccount}
          >
            <SideBarItem title={"Add User"} icon={defaultIcon} />
          </div>
        ) : (
          <div />
        )}
        <SideBarItem title={"Settings"} icon={defaultIcon} />
        <SideBarItem
          title={"Logout"}
          icon={defaultIcon}
          onclick={() => nav("/logout")}
        />
      </div>
    </div>
  );
}

export default SideBar;
