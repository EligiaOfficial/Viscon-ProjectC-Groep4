import { useEffect, useState } from "react";
import { createMessageAxios, createTicketAxios } from "../Endpoints/Dto";
import { getId, getName } from "../Endpoints/Jwt";
import ChatField from "./ChatField";
import { useTranslation } from "react-i18next";
import whiteCrossIcon from "../assets/icons/white-cross.svg";

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

  const [images, setImages] = useState<File[]>([]);
  const [supportedFile, setSupportedFile] = useState<boolean>(true);
  const [oversized, setOversized] = useState<boolean>(false);
  const [duplicateFile, setDuplicateFile] = useState<boolean>(false);
  const [noContent, setNoContent] = useState(false);

  const { t } = useTranslation();

  // const handleFileChange = (e) => {
  //   const files = Array.from(e.target.files);
  //   setSelectedFiles(files);
  // };

  const allImages: string[] = [
    "png",
    "jpg",
    "jpeg",
    "gif",
    "tiff",
    "bpg",
    "image/png",
    "image/jpg",
    "image/jpeg",
    "image/gif",
    "image/tiff",
    "image/bpg",
  ];

  const handleImage = (imageArray: any) => {
    for (let i = 0; i < imageArray.length; i++) {
      setOversized(false);
      setSupportedFile(true);
      setDuplicateFile(false);

      if (imageArray[i].size / 1024 > 1000) {
        setOversized(true);
        return;
      }

      if (allImages.indexOf(imageArray[i].type) === -1) {
        setSupportedFile(false);
        return;
      }

      if (images.length === 0) {
        if (imageArray.length === 1) {
          setImages([...images, imageArray[0]]);
          return;
        }
        setImages([...images, ...imageArray]);
        return;
      }

      for (let j = 0; j < images.length; j++) {
        if (images[j]!.name == imageArray[i].name) {
          setDuplicateFile(true);
          return;
        }
      }
    }
    if (imageArray.length === 1) {
      setImages([...images, imageArray[0]]);
      return;
    }
    setImages([...images, ...imageArray]);
  };

  const getBase64 = (file: any) => {
    return new Promise((resolve, reject) => {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = function () {
        resolve(reader.result?.toString().split(",")[1]);
      };
      reader.onerror = function (error) {
        reject(error);
      };
    });
  };

  const addMessage = async (content: string) => {
    var files: any = [];
    if (images.length > 0) {
      for (let i = 0; i < images.length; i++) {
        var base64string = await getBase64(images[i]);
        var file = {
          imageFile: base64string,
          imageName: images[i].name,
          imageId: -(1 + i),
        };
        files.push(file);
      }
    }

    let newMessage = {
      content: content,
      sender: getName(token)[0] + " " + getName(token)[1],
      timeSend: new Date(),
      senderId: userId,
      images: files,
    };
    setMessages((prevMessages) => [newMessage, ...prevMessages]);
    setImages([]);
  };

  useEffect(() => {
    setMessages(initialMessages || []);
    setUserId(getId(token));
  }, [initialMessages]);

  // const submitMessage = (e) => {
  //   e.preventDefault();

  //   if (content !== "") {
  //     createMessageAxios({
  //       content: content,
  //       ticketId: ticketId,
  //     })
  //       .then((res) => {
  //         if (res.status === 200) {
  //           addMessage(content);
  //         }
  //         setMsg("");
  //       })
  //       .catch((error) => {
  //         console.error("Error:", error);
  //       });
  //   }
  // };

  const submitMessage = async (e: React.FormEvent) => {
    setNoContent(false);

    e.preventDefault();

    if (content == "") {
      setNoContent(true);
      return;
    }

    try {
      const formData: any = new FormData();
      formData.append("content", content);
      formData.append("ticketId", ticketId);

      if (images.length > 0) {
        images.forEach((image) => {
          formData.append(`images`, image, image!.name);
        });
      }

      await createMessageAxios(formData)
        .then((res: any) => {
          addMessage(content);
          setMsg("");
        })
        .catch((err: any) => {
          console.log(err);
        });
    } catch (error) {
      console.error("Error creating ticket:", error);
    }
  };

  const handleRemoveImage = (imageName: string) => {
    if (images.length > 0) {
      let newArray: any = images.filter((image) => image!.name !== imageName);
      setImages(newArray);
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
          <div className={"grid grid-cols-1 py-2 px-10 w-fit gap-x-2"}>
            <span className={"text-sm italic"}>
              {t("tickets.ticket.description")}:{" "}
              <span className="font-bold">{ticket["description"]}</span>
            </span>
            <span className={"text-sm italic"}>
              {t("tickets.ticket.edit")}:{" "}
              <span className="font-bold">{ticket["madeAnyChanges"]}</span>
            </span>
            <span className={"text-sm italic"}>
              {t("tickets.ticket.expected")}:{" "}
              <span className="font-bold">{ticket["expectedToBeDone"]}</span>
            </span>
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
                <div className="flex ps-0 space-x-1 rtl:space-x-reverse sm:ps-2 overflow-auto p-2">
                  {images.map((image) => (
                    <div key={image?.name} className="flex flex-col">
                      <div className="group relative h-[200px] w-[200px]">
                        <img
                          onClick={() => handleRemoveImage(image!.name)}
                          className="hover:scale-110 scale-90 translate-y-1/4 -translate-x-1/4 active:scale-90 w-[30px] h-[30px] z-50 cursor-pointer absolute opacity-0 group-hover:opacity-100 duration-100 top-0 right-0"
                          src={whiteCrossIcon}
                        />
                        <div
                          onClick={() =>
                            window.open(URL.createObjectURL(image!), "_blank")
                          }
                          className="cursor-pointer opacity-0 group-hover:opacity-100 duration-200 w-full h-full absolute top-0 left-0 z-20 bg-gradient-to-t from-black/40 via-black/20 to-black/40"
                        />
                        <img
                          className={`object-cover h-[200px] w-[200px]`}
                          src={URL.createObjectURL(image!)}
                        />
                      </div>
                      <span className="italic text-xs dark:text-white w-[200px] overflow-hidden px-1 break-all max-h-[32px]">
                        {image?.name}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between px-3 py-2">
                  <div className="flex flex-row gap-2 items-center">
                    <button
                      type="submit"
                      className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-stone-900 hover:bg-blue-800"
                      onClick={submitMessage}
                    >
                      {t("tickets.ticket.postMessage")}
                    </button>
                    <span className="text-red-600">
                      {noContent
                        ? "Add a message."
                        : !supportedFile
                        ? "File is not supported."
                        : oversized
                        ? "Only files of max 1MB are allowed."
                        : duplicateFile
                        ? "No duplicate files allowed"
                        : ""}
                    </span>
                  </div>
                  <div>
                    <input
                      type="file"
                      id="uploadInput"
                      accept="image/*"
                      multiple
                      onChange={(e) => {
                        handleImage(e.target.files);
                      }}
                      className="hidden"
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
