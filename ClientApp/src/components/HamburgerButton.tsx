function HamburgerButton(props: any) {
  return (
    <div className="flex flex-row justify-end py-2">
      <div
        onClick={props.onclick}
        className={`fill-black translate flex items-center justify-center min-w-[50px] cursor-pointer`}
      >
        <svg width="24" height="24">
          <rect
            className={`${
              props.state ? "translate-x-[10px]" : ""
            } translate duration-300`}
            y="2"
            width="24"
            height="3"
          />
          <rect y="11" width="24" height="3"/>
          <rect
            className={`${
              props.state ? "translate-x-[-10px]" : ""
            } translate duration-300`}
            y="20"
            width="24"
            height="3"
          />
        </svg>
      </div>
    </div>
  );
}

export default HamburgerButton;
