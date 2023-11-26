import { useState } from "react";
import { getRole } from "../Endpoints/Jwt";
import { useNavigate } from "react-router-dom";
import SideBarItem from "./SideBarItem";
import defaultIcon from "../assets/default-dashboard-icon.svg";
import HamburgerButton from "./HamburgerButton";
import { UserRoles } from "../UserRoles";

function SideBar() {
  const [menu, setMenu] = useState<boolean>(false);
  const nav = useNavigate();
  const token = localStorage.getItem("token");
  const Role = getRole(token);

  return (
    <div
      className={`${
        menu ? "w-[200px]" : "w-[50px]"
      } min-w-[50px] relative z-10 translate duration-300 flex flex-col gap-10 h-full bg-blue-500 overflow-hidden`}
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
        <SideBarItem title={"Archive"} icon={defaultIcon} />
        <SideBarItem title={"New"} icon={defaultIcon} />
        <SideBarItem title={"Critical"} icon={defaultIcon} />
        <SideBarItem title={"Normal"} icon={defaultIcon} />
        {Role == UserRoles.ADMIN || Role == UserRoles.KEYUSER ? (
          <SideBarItem
            title={"Add User"}
            icon={defaultIcon}
            onclick={() => nav("/add")}
          />
        ) : (
          <div />
        )}
      </div>
      <div className="mt-auto">
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
