import { useEffect, useState } from "react";
import { getRole } from "../Endpoints/Jwt";
import { useNavigate } from "react-router-dom";
import SideBarItem from "./SideBarItem";
import HamburgerButton from "./HamburgerButton";
import { UserRoles } from "../UserRoles";
import UserSettings from "../pages/UserSettings";
import dashboardIcon from "../assets/icons/home.svg";
import ticketIcon from "../assets/icons/ticket.svg";
import archiveIcon from "../assets/icons/archive.svg";
import newIcon from "../assets/icons/new.svg";
import criticalIcon from "../assets/icons/critical.svg";
import normalIcon from "../assets/icons/normal.svg";
import userIcon from "../assets/icons/user.svg";
import settingsIcon from "../assets/icons/settings.svg";
import logoutIcon from "../assets/icons/logout.svg";
import ProfileItem from "./ProfileItem";
import GroupTitle from "./GroupTitle";
import Seperator from "./Seperator";
import mailIcon from "../assets/icons/mail.svg";
import profileAI from "../assets/images/ai-generated-7751688_1280.jpg";
import { getUser } from "../Endpoints/Dto";
import { useTranslation } from "react-i18next";
import animatedImg from "../assets/images/dribbble_100_size25fps.gif";

type User = {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
};

function SideBar() {
  const { t } = useTranslation();

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
    <div className="flex items-center h-full absolute z-50">
      <div
        className={`${
          menu
            ? "w-[250px] bg-sky-700/50 dark:bg-stone-900/50"
            : "w-[50px] bg-sky-600 dark:bg-stone-800"
        } min-w-[50px] translate duration-300 flex flex-col overflow-hidden h-full backdrop-blur-sm`}
      >
        <HamburgerButton onclick={() => setMenu(!menu)} state={menu} />

        <div className="flex flex-col pt-4">
          <GroupTitle title={t("sidebar.overview.title")} toggle={menu} />
          <SideBarItem
            title={t("sidebar.overview.dashboard")}
            icon={dashboardIcon}
            onclick={() => {
              setMenu(false);
              nav("/dashboard");
            }}
            transformAnimation={"rotate3d(0,1,0,180deg)"}
          />
          <SideBarItem
            title={t("sidebar.overview.mailbox")}
            icon={mailIcon}
            transformAnimation={"rotate3d(0,1,0,180deg"}
          />
          <SideBarItem
            title={t("sidebar.overview.tickets")}
            icon={normalIcon}
            onclick={() => {
              setMenu(false);
              nav("/tickets/all");
            }}
            transformAnimation={"rotate3d(0,1,0,180deg"}
          />
          <Seperator color="white" marginX="4px" marginY="16px" />
          <div className="flex flex-col">
            <GroupTitle title={t("sidebar.filters.title")} toggle={menu} />
            <SideBarItem
              title={t("sidebar.filters.open")}
              icon={newIcon}
              onclick={() => {
                setMenu(false);
                nav("/tickets/unassigned");
              }}
              transformAnimation={"rotate3d(0,1,0,180deg"}
            />
            <SideBarItem
              title={t("sidebar.filters.critical")}
              icon={criticalIcon}
              onclick={() => {
                setMenu(false);
                nav("/tickets/critical");
              }}
              transformAnimation={"rotate(360deg)"}
            />
            <SideBarItem
              title={t("sidebar.filters.archive")}
              icon={archiveIcon}
              onclick={() => {
                setMenu(false);
                nav("/tickets/archive");
              }}
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
              <GroupTitle title={t("sidebar.create.title")} toggle={menu} />
              <SideBarItem
                title={t("sidebar.create.ticket")}
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
              title={t("sidebar.create.user")}
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
          {/*<SideBarItem*/}
          {/*  title={"Settings"}*/}
          {/*  icon={settingsIcon}*/}
          {/*  transformAnimation={"rotate(360deg)"}*/}
          {/*  onclick={() => setShowSettings(!showSettings)}*/}
          {/*/>*/}
          <SideBarItem
            title={t("sidebar.logout")}
            icon={logoutIcon}
            onclick={() => nav("/logout")}
            transformAnimation={"rotate3d(0,1,0,180deg"}
          />
        </div>
        <div className="mt-auto" onClick={() => setShowSettings(!showSettings)}>
          <ProfileItem icon={animatedImg} user={user} />
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
