import defaultIcon from "../assets/icons/profile.svg";
import { getEmail, getName, getRole } from "../Endpoints/Jwt";
import { getRoleKey, UserRoles } from "../UserRoles";

type User = {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
};

type Props = {
  icon?: any;
  onclick?: any;
  user: User | undefined;
};

function ProfileItem(props: Props) {
  const setDefaultProfile = (e: any) => {
    e.target.src = defaultIcon;
  };

  const token = localStorage.getItem("token");
  const name = getName(token)[0] + " " + getName(token)[1];
  const email = getEmail(token);
  const role = getRoleKey(getRole(token));

  return (
    <div className="flex flex-row cursor-pointer py-2 gap-2 bg-sky-600 dark:bg-stone-800 select-none hover:bg-sky-100 dark:hover:bg-stone-400 duration-500 group">
      <div
        className={`flex items-center justify-center min-w-[50px] max-w-[50px]`}
      >
        {props.icon ? (
          <img
            className={`translate object-cover duration-300 min-w-[40px] max-w-[40px] min-h-[40px] max-h-[40px] rounded-full border border-black dark:border-white group-hover:border-sky-600 dark:group-hover:border-stone-900`}
            src={props.icon}
            onError={(e) => setDefaultProfile(e)}
          />
        ) : (
          <div className="relative w-[40px] h-[40px] flex items-center justify-center rounded-full bg-orange-700">
            <span className="leading-none text-xl text-white pb-[2px]">HS</span>
          </div>
        )}
      </div>
      <div className="dark:group-hover:text-black flex flex-col whitespace-nowrap min-h-[70px] justify-center dark:text-white">
        <span className="font-semibold">
          {props.user == undefined ? "" : name}
        </span>
        <span className="text-xs">{email}</span>
        <span className="text-sm italic">{role}</span>
      </div>
    </div>
  );
}

export default ProfileItem;
