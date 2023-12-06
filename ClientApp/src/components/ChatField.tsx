function ChatField({
  user,
  message,
  timestamp,
}: {
  user: string;
  message: string;
  timestamp: Date;
}) {
  const formattedDate = new Intl.DateTimeFormat("en-GB", {
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(timestamp);

  return (
    <div className={"w-full pt-5"}>
      <div className={""}>
        <div className={"flex flex-row items-center justify-between"}>
          <h1 className={"text-2xl font-bold"}>{user}</h1>
          <p className={"text-sm mr-2.5"}>{formattedDate}</p>
        </div>
        <p className={"text-md"}>{message}</p>
      </div>
      <hr className="h-[2px] mt-5 bg-gray-200 border-0 dark:bg-gray-700" />
    </div>
  );
}

export default ChatField;
