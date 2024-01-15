import { useState } from "react";

interface Props {
  icon: any;
  title: string;
  onclick?: any;
  transformAnimation?: string;
}

function SideBarItem(props: Props) {
  const [animate, setAnimate] = useState<boolean>(false);

  return (
    <div
      onMouseEnter={() => setAnimate(true)}
      onMouseLeave={() => setAnimate(false)}
      onClick={props.onclick}
      className="group dark:hover:bg-stone-900 hover:bg-white active:bg-stone-400 translate duration-100 flex flex-row justify-start py-2 cursor-pointer select-none"
    >
      <div
        className={`flex items-center justify-center min-w-[50px] max-w-[50px]`}
      >
        <img
          className={`translate duration-300 min-w-[24px] max-w-[24px] min-h-[24px] max-h-[24px] dark:invert`}
          style={{
            transform: animate ? props.transformAnimation : "",
            // filter:
            //   "invert(100%) sepia(1%) saturate(0%) hue-rotate(20deg) brightness(102%) contrast(100%)",
          }}
          src={props.icon}
        />
      </div>
      <span className="whitespace-nowrap group-hover:tracking-wider translate duration-100 dark:text-white">
        {props.title}
      </span>
    </div>
  );
}

export default SideBarItem;
