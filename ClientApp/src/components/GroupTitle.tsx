interface GroupType {
  title: string;
  toggle: boolean;
}

function GroupTitle(props: GroupType) {
  return (
    <div
      className={`${
        props.toggle ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
      } grid pl-[16px] duration-300`}
    >
      <div className="overflow-hidden">
        <span className="font-bold text-sm italic dark:text-white">
          {props.title}
        </span>
      </div>
    </div>
  );
}

export default GroupTitle;
