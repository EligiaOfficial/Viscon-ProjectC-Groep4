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
    ticketId: number
    ticket: object;
    messages: object[];
}) {
  const [content, setMsg] = useState("");
  const [img] = useState("");
  const token = localStorage.getItem("token");

  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
  };

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
    <div className={"w-full bg-stone-200 dark:bg-stone-400 flex items-center justify-center"}>
      <div className={"h-full w-full flex flex-col items-center"}>
        <div className="py-5 w-full border">
          <div className="text-3xl font-bold mx-auto w-11/12 group relative">
            <span className="text-sm font-normal italic absolute left-0 top-0 opacity-0 group-hover:opacity-100 transition-opacity inline-block -mt-4">Title:</span>
            {ticket["title"]}
          </div>
        </div>

        <div className={"w-full border py-2.5"}>
          <div className={"flex flex-col"}>
            <div className={"text-md font-bold w-11/12 mx-auto"}>
              <span className={"text-sm font-normal italic inline-block w-32 mx-auto"}>Description:</span> {ticket["description"]}
            </div>
            <div className={"text-md font-bold w-11/12 mx-auto"}>
              <span className={"text-sm font-normal italic inline-block w-32 mx-auto"}>Changes Made:</span> {ticket["madeAnyChanges"]}
            </div>
            <div className={"text-md font-bold w-11/12 mx-auto"}>
              <span className={"text-sm font-normal italic inline-block w-32 mx-auto"}>Expected to be done:</span> {ticket["expectedToBeDone"]}
            </div>
          </div>
        </div>



        <div className="w-11/12">
          <div className={"mx-auto"}>

            <form>
              <div
                  className="w-full mt-10 bg-stone-50 dark:bg-stone-700 border dark:border-stone-600">
                <div className="px-4 py-2 bg-white dark:bg-stone-800">
                  <label htmlFor="comment" className="sr-only">Your comment</label>
                  <textarea id="comment" rows="4"
                            className="w-full px-0 text-sm text-stone-900 bg-white dark:bg-stone-800 focus:ring-0 dark:text-white dark:placeholder-stone-400"
                            placeholder="Write a comment..." required
                            onChange={(e) => setMsg(e.target.value)}
                  />
                </div>
                <div className="flex items-center justify-between px-3 py-2">
                  <button type="submit"
                          className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
                          onClick={submitMessage}
                  >
                    Post Message
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
                        <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                             viewBox="0 0 20 18">
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
                              0 1 .028 1.011Z"/>
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
          <div className="w-11/12 mx-auto mt-0.5">
            <div className="py-2">
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
          <div className="w-11/12 mx-auto border rounded-lg mt-2.5 bg-white dark:bg-stone-400">
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
