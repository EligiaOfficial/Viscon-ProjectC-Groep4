import defaultIcon from "../assets/profile.svg";

interface Props {
  icon?: any;
  onclick?: any;
}

function ProfileItem(props: Props) {
  const setDefaultProfile = (e: any) => {
    e.target.src = defaultIcon;
  };

  return (
    <div className="flex flex-row cursor-pointer py-2 gap-2 bg-sky-600 select-none hover:bg-sky-100 duration-500 group">
      <div
        className={`flex items-center justify-center min-w-[50px] max-w-[50px]`}
      >
        {props.icon ? (
          <img
            className={`translate duration-300 min-w-[40px] max-w-[40px] min-h-[40px] max-h-[40px] rounded-full border border-black group-hover:border-sky-600`}
            src={props.icon}
            onError={(e) => setDefaultProfile(e)}
          />
        ) : (
          <div className="relative w-[40px] h-[40px] flex items-center justify-center rounded-full bg-orange-700">
            <span className="leading-none text-xl text-white pb-[2px]">HS</span>
          </div>
        )}
      </div>
      <div className="flex flex-col whitespace-nowrap">
        <span className="font-semibold">Henk</span>
        <span className="text-xs">henk.scholten@viscon.nl</span>
        <span className="text-sm">Viscon Administrator</span>
      </div>
    </div>
  );
}

export default ProfileItem;