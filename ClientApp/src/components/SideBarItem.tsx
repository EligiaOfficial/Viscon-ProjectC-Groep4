interface Props {
  icon: any;
  title: string;
  onclick?: any;
}

function SideBarItem(props: Props) {
  return (
    <div
      onClick={props.onclick}
      className="group flex flex-row justify-start py-2 cursor-pointer"
    >
      <div
        className={`flex items-center justify-center min-w-[50px] max-w-[50px]`}
      >
        <img
          className="min-w-[24px] max-w-[24px] min-h-[24px] max-h-[24px]"
          src={props.icon}
        />
      </div>
      <span className="group-hover:text-white translate duration-300 whitespace-nowrap">
        {props.title}
      </span>
    </div>
  );
}

export default SideBarItem;
