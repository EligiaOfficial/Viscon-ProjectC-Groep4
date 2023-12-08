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
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(timestamp);

  return (
    <div className={"w-full dark:bg-stone-700 mb-2.5 px-5 pt-2.5 pb-5"}>
      <div className={""}>
        <div className={"flex flex-row items-center justify-between"}>
          <h1 className={"dark:text-stone-300 text-md font-bold"}>{user}</h1>
          <p className={"dark:text-stone-300 text-sm mr-2.5"}>{formattedDate}</p>
        </div>
        <div className={"dark:bg-stone-300 rounded border-lg p-2.5"}>
          <p className={"text-md"}>{message}</p>
        </div>
      </div>
    </div>
  );
}

export default ChatField;
