function HamburgerButton(props: any) {
  return (
    <div className="flex flex-row justify-end py-2">
      <div
        onClick={props.onclick}
        className={`hover:fill-white fill-black translate flex items-center justify-center min-w-[50px] cursor-pointer`}
      >
        <svg width="24" height="24">
          <rect
            className={`${
              props.state ? "translate-x-[10px]" : ""
            } translate duration-300`}
            y="2"
            width="24"
            height="3"
          ></rect>
          <rect
            className="translate duration-300 delay-50"
            y="11"
            width="24"
            height="3"
          ></rect>
          <rect
            className={`${
              props.state ? "translate-x-[-10px]" : ""
            } translate duration-300 delay-100`}
            y="20"
            width="24"
            height="3"
          ></rect>
        </svg>
      </div>
    </div>
  );
}

export default HamburgerButton;
