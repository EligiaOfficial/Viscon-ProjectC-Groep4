import { useEffect, useState } from "react";
import { createMessageAxios } from "../Endpoints/Dto";
import { getId, getName } from "../Endpoints/Jwt";
import ChatField from "./ChatField";
import { useTranslation } from "react-i18next";

function TicketChat({
  ticketId,
  ticket,
  messages: initialMessages,
}: {
  ticketId: number;
  ticket: object;
  messages: object[];
}) {
  const [messages, setMessages] = useState(initialMessages);
  const [content, setMsg] = useState("");
  const token = localStorage.getItem("token");
  const [userId, setUserId] = useState<string>();

  const [selectedFiles, setSelectedFiles] = useState([]);

  const { t } = useTranslation();

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
  };

  const addMessage = (content) => {
    let newMessage = {
      content: content,
      sender: getName(token)[0] + " " + getName(token)[1],
      timeSend: new Date(),
      senderId: userId,
    };
    console.log(newMessage);
    setMessages((prevMessages) => [newMessage, ...prevMessages]);
  };

  useEffect(() => {
    setMessages(initialMessages || []);
    setUserId(getId(token));
  }, [initialMessages]);

  const submitMessage = (e) => {
    e.preventDefault(); // TODO: Reload Chat ipv Page
    console.log("msg: " + content);

    if (content !== "") {
      createMessageAxios({
        content: content,
        ticketId: +ticketId,
      })
        .then((res) => {
          if (res.status === 200) {
            addMessage(content);
          }
          setMsg("");
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  return (
    <div
      className={
        "w-full bg-white dark:bg-stone-400 flex items-center justify-center"
      }
    >
      <div className={"h-full w-full flex flex-col items-center"}>
        <div className="flex flex-col px-4 py-5 w-full">
          <span className="text-sm font-normal italic">
            {t("tickets.ticket.title")}:
          </span>
          <span className="text-3xl font-bold">
            {"#" + ticketId + " - " + ticket["title"]}
          </span>
        </div>
        <div className="border-y-2 w-full">
          <div className={"grid grid-cols-2 py-2 px-10 w-fit"}>
            <span className={"text-sm italic"}>
              {t("tickets.ticket.description")}:
            </span>
            <span className="font-bold">{ticket["description"]}</span>
            <span className={"text-sm italic"}>
              {t("tickets.ticket.edit")}:
            </span>
            <span className="font-bold">{ticket["madeAnyChanges"]}</span>
            <span className={"text-sm italic"}>
              {t("tickets.ticket.expected")}:
            </span>
            <span className="font-bold">{ticket["expectedToBeDone"]}</span>
          </div>
        </div>
        <div className="px-10 w-full">
          <div className={"mx-auto"}>
            <form>
              <div className="w-full mt-10 bg-stone-50 dark:bg-stone-700 border-2 dark:border-stone-600">
                <div className="px-4 py-2 bg-white dark:bg-stone-800">
                  <label htmlFor="comment" className="sr-only">
                    Your comment
                  </label>
                  <textarea
                    id="comment"
                    value={content}
                    className="outline-none w-full px-0 my-1.5 text-sm text-stone-900 bg-white dark:bg-stone-800 dark:focus:ring-gray-900 focus:ring-0 focus:ring-blue-900 dark:text-white dark:placeholder-stone-400"
                    placeholder={t("tickets.ticket.commentPlaceholder")}
                    required
                    onChange={(e) => setMsg(e.target.value)}
                  />
                </div>
                <div className="flex items-center justify-between px-3 py-2">
                  <button
                    type="submit"
                    className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-stone-900 hover:bg-blue-800"
                    onClick={submitMessage}
                  >
                    {t("tickets.ticket.postMessage")}
                  </button>
                  <div className="flex ps-0 space-x-1 rtl:space-x-reverse sm:ps-2">
                    <div>
                      <input
                        type="file"
                        className="hidden"
                        id="uploadInput"
                        onChange={handleFileChange}
                        multiple
                      />
                      <label
                        htmlFor="uploadInput"
                        className="inline-flex justify-center items-center p-2 text-stone-500 cursor-pointer hover:text-stone-900 hover:bg-stone-100 dark:text-stone-400 dark:hover:text-white dark:hover:bg-stone-600"
                      >
                        <svg
                          className="w-4 h-4"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 20 18"
                        >
                          <path
                            d="M18 0H2a2 2 0 0 0-2 
                              2v14a2 2 0 0 0 2 
                              2h16a2 2 0 0 0 2-2V2a2 
                              2 0 0 0-2-2Zm-5.5 4a1.5 
                              1.5 0 1 1 0 3 1.5 1.5 0 
                              0 1 0-3Zm4.376 10.481A1 
                              1 0 0 1 16 15H4a1 1 0 0 
                              1-.895-1.447l3.5-7A1 1 
                              0 0 1 7.468 6a.965.965 
                              0 0 1 .9.5l2.775 4.757 
                              1.546-1.887a1 1 0 0 1 
                              1.618.1l2.541 4a1 1 0 
                              0 1 .028 1.011Z"
                          />
                        </svg>
                        <span className="sr-only">Upload image</span>
                      </label>
                      {selectedFiles.length > 0 && (
                        <div>
                          <p>Selected Files:</p>
                          <ul>
                            {selectedFiles.map((file, index) => (
                              <li key={index}>{file.name}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>

        {messages.length > 0 ? (
          <div className="w-full px-10">
            <div className="border-2 dark:bg-stone-700 p-4 flex flex-col gap-4">
              {messages.map((message, index) => (
                <ChatField
                  key={index}
                  message={message["content"]}
                  user={message["sender"]}
                  timestamp={message["timeSent"]}
                  self={message["senderId"] == userId ? true : false}
                  images={message["images"]}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="w-full px-10  mt-2.5 ">
            <div className="px-2 border rounded-lg bg-white dark:bg-stone-400">
              <div className={"w-full py-5"}>
                <div className={""}>
                  <p className={"text-md"}>{t("tickets.ticket.noMessages")}</p>
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
