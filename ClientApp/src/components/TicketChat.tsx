import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { createMessageAxios } from "../Endpoints/Dto";
import { getId } from "../Endpoints/Jwt";
import ChatField from "./ChatField";

function TicketChat({
  ticketId,
  ticket,
  messages,
}: {
    ticketId: int
    ticket: object;
    messages: object[];
}) {
  const [content, setMsg] = useState("");
  const [img] = useState("");
  const token = localStorage.getItem("token");

  const submitMessage = (e) => {
    e.preventDefault(); // TODO: Reload Chat ipv Page
    console.log("msg: " + content);

    if (content !== "") {
      createMessageAxios({
        content: content,
        ticketId: +ticketId,
        sender: +getId(token),
      })
        .then(() => {
          console.log(content, img);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  return (
    <div className={"w-5/6 bg-stone-200 dark:bg-stone-400 flex items-center justify-center"}>
      <div className={"h-full md:w-5/6 w-full flex flex-col items-center"}>
        <div className={"py-5 md:w-3/4 w-full"}>
          <h1 className={"text-3xl font-bold"}>{ticket["title"]}</h1>
          <h2 className={"text-md font-bold"}>{ticket["description"]}</h2>
          <h2 className={"text-md font-bold"}>{ticket["madeAnyChanges"]}</h2>
          <h2 className={"text-md font-bold"}>{ticket["expectedToBeDone"]}</h2>
        </div>

        <div className="md:w-3/4 w-full bg-white border rounded-lg dark:bg-stone-500">
          <div className={"w-11/12 mx-auto pt-7"}>
            <textarea
              id="message"
              rows="4"
              onChange={(e) => setMsg(e.target.value)}
              className="block p-2.5 dark:bg-stone-300 w-full text-sm text-gray-900 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Write your thoughts here..."
            />
          </div>
          <form className={"w-11/12 mx-auto"} onSubmit={submitMessage}>
            <label
              className="block mb-2 text-sm dark:text-white"
              htmlFor="file_input"
            >
              <p className={"font-medium text-gray-900"}>Upload File(s)</p>
            </label>
            <input
              className="block w-full text-sm text-gray-900 border rounded-lg
                            cursor-pointer
                            dark:border-gray-600 dark:placeholder-gray-400"
              id="multiple_files"
              type="file"
              multiple
            />
            <div className={"flex flex-row justify-between"}>
              <p className={"font-medium text-gray-900"}>SVG, PNG or JPG</p>
              <button
                type="submit"
                className="flex justify-center rounded-md bg-gray-600 px-3 py-1.5 mx-1.5 my-2.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                Submit
              </button>
            </div>
          </form>
        </div>

        {messages.length > 0 ? (
          <div className="md:w-3/4 w-full border rounded-lg mt-2.5 dark:bg-stone-500 bg-white">
            <div className="mx-10">
              {messages.map((message, index) => (
                <ChatField
                  key={index}
                  message={message["content"]}
                  user={message["sender"]}
                  timestamp={message["timeSent"]}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="md:w-3/4 w-full border rounded-lg mt-2.5 bg-white dark:bg-stone-400">
            <div className="mx-10">
              <div className={"w-full py-5"}>
                <div className={""}>
                  <p className={"text-md"}>No messages found yet...</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TicketChat;
