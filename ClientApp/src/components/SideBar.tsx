import { useEffect, useState } from "react";
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
import profileIcon from "../assets/profile.svg";
import ProfileItem from "./ProfileItem";
import GroupTitle from "./GroupTitle";
import Seperator from "./Seperator";
import mailIcon from "../assets/mail.svg";
import profileAI from "../assets/ai-generated-7751688_1280.jpg";
import { getUser } from "../Endpoints/Dto";

type User = {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
};

function SideBar() {
  const [menu, setMenu] = useState<boolean>(false);
  const [showSettings, setShowSettings] = useState(false);
  const [user, setUser] = useState<User | undefined>();

  const nav = useNavigate();
  const token = localStorage.getItem("token");
  const Role = getRole(token);

  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };
  let rendered = false;

  useEffect(() => {
    if (!rendered) {
      getUser()
        .then((response: any) => {
          if (response.data) {
            setUser(response.data);
          }
        })
        .catch((error: any) => {
          console.log(error);
        });
      rendered = true;
    }
  }, []);

  return (
    <div className="flex items-center h-full absolute z-50 ">
      <div
        onMouseOver={() => setMenu(true)}
        onMouseLeave={() => setMenu(false)}
        className={`${
          menu
            ? "w-[250px] bg-sky-700/50 dark:bg-stone-900/50"
            : "w-[50px] bg-sky-600 dark:bg-stone-800"
        } min-w-[50px] translate duration-300 flex flex-col overflow-hidden h-full backdrop-blur-sm`}
      >
        {/* <HamburgerButton onclick={() => setMenu(!menu)} state={menu} /> */}
        <div className="">
          <ProfileItem icon={profileAI} user={user} />
        </div>
        <div className="flex flex-col pt-4">
          <GroupTitle title={"Views"} toggle={menu} />
          <SideBarItem
            title={"Dashboard"}
            icon={dashboardIcon}
            onclick={() => nav("/dashboard")}
            transformAnimation={"rotate3d(0,1,0,180deg)"}
          />
          <SideBarItem
            title={"Mailbox"}
            icon={mailIcon}
            transformAnimation={"rotate3d(0,1,0,180deg"}
          />
          <SideBarItem
            title={"Tickets"}
            icon={normalIcon}
            onclick={() => nav("/tickets/all")}
            transformAnimation={"rotate3d(0,1,0,180deg"}
          />
          <Seperator color="white" marginX="4px" marginY="16px" />
          <div className="flex flex-col">
            <GroupTitle title={"Filters"} toggle={menu} />
            <SideBarItem
              title={"New"}
              icon={newIcon}
              onclick={() => nav("/tickets/new")}
              transformAnimation={"rotate3d(0,1,0,180deg"}
            />
            <SideBarItem
              title={"Critical"}
              icon={criticalIcon}
              onclick={() => nav("/tickets/critical")}
              transformAnimation={"rotate(360deg)"}
            />
            <SideBarItem
              title={"Archive"}
              icon={archiveIcon}
              onclick={() => nav("/tickets/archive")}
              transformAnimation={"rotate3d(0,1,0,180deg"}
            />
          </div>
        </div>
        <div className="flex flex-col">
          {Role == UserRoles.ADMIN ||
          Role == UserRoles.KEYUSER ||
          Role == UserRoles.VISCON ? (
            <>
              <Seperator color="white" marginX="4px" marginY="16px" />
              <GroupTitle title={"Create"} toggle={menu} />
              <SideBarItem
                title={"Add Ticket"}
                icon={ticketIcon}
                onclick={() => nav("/create")}
                transformAnimation={"rotate(180deg)"}
              />
            </>
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
        <div className=""></div>
        <Seperator color="white" marginX="4px" marginY="16px" />
        <div className="flex flex-col">
          <SideBarItem
            title={"Settings"}
            icon={settingsIcon}
            transformAnimation={"rotate(360deg)"}
            onclick={() => setShowSettings(!showSettings)}
          />
          <SideBarItem
            title={"Logout"}
            icon={logoutIcon}
            onclick={() => nav("/logout")}
            transformAnimation={"rotate3d(0,1,0,180deg"}
          />
        </div>
      </div>
      <div
        className={`grid duration-200 ${
          showSettings ? "grid-cols-[1fr]" : "grid-cols-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <UserSettings toggleSettings={toggleSettings} />
        </div>
      </div>
    </div>
  );
}

export default SideBar;
