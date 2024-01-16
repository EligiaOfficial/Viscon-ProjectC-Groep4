type TicketSideBarItem = {
  icon: any;
  subtitle: string;
  title: string;
};

function TicketSideBarItem(props: TicketSideBarItem) {
  return (
    <div className="flex flex-row items-center gap-2">
      <img
        className={`min-w-[24px] max-w-[24px] min-h-[24px] max-h-[24px] dark:invert`}
        alt={""}
        src={props.icon}
      />
      <div className={`flex flex-col w-full min-w-[50px]`}>
        <h1 className="flex font-bold italic text-md">{props.title}</h1>
        <h1 className="text-md flex">{props.subtitle}</h1>
      </div>
    </div>
  );
}

export default TicketSideBarItem;
