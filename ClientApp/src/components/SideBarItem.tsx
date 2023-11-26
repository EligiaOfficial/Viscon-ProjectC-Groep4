interface Props {
  icon: any;
  title: string;
  onclick?: any;
  animation?: string;
}

function SideBarItem(props: Props) {
  return (
    <div
      onClick={props.onclick}
      className="group hover:bg-white active:bg-stone-400 translate duration-100 flex flex-row justify-start py-2 cursor-pointer select-none"
    >
      <div
        className={`flex items-center justify-center min-w-[50px] max-w-[50px]`}
      >
        <img
          className={`group-hover:${
            props.animation ?? "none"
          } translate duration-300 min-w-[24px] max-w-[24px] min-h-[24px] max-h-[24px]`}
          src={props.icon}
        />
      </div>
      <span className="whitespace-nowrap group-hover:tracking-wider translate duration-100">
        {props.title}
      </span>
    </div>
  );
}

export default SideBarItem;
