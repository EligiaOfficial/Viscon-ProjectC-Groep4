import { useEffect, useState } from "react";
import whiteCrossIcon from "../assets/icons/white-cross.svg";
import defaultIcon from "../assets/images/dribbble_100_size25fps.gif";
import { useTranslation } from "react-i18next";

function ChatField({
  user,
  message,
  timestamp,
  self,
  images,
}: {
  user: string;
  message: string;
  timestamp: Date;
  self: boolean;
  images: any;
}) {
  const { t, i18n } = useTranslation();
  const formattedDate = new Intl.DateTimeFormat(i18n.language, {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(timestamp);

  const [enlargedImage, setEnlargedImage] = useState<number>();

  useEffect(() => {
    document.addEventListener("keydown", detectKeyDown, true);
  }, []);

  const detectKeyDown = (e: KeyboardEvent) => {
    if (e.key == "Escape") {
      setEnlargedImage(0);
    }
  };

  return (
    <div className={`w-full`}>
      <div
        className={`${
          self
            ? "bg-sky-100 dark:bg-stone-900"
            : "bg-stone-100 dark:bg-stone-500"
        }  flex flex-col gap-4 rounded border-2 p-2.5`}
      >
        <div
          className={"flex flex-row items-center justify-between gap-4 px-2"}
        >
          <div className="flex flex-row gap-2 items-center py-2">
            <img
              src={defaultIcon}
              className={`${
                self
                  ? "border-sky-600 dark:border-orange-300"
                  : "border-black dark:border-white"
              } translate object-cover duration-300 min-w-[40px] max-w-[40px] min-h-[40px] max-h-[40px] rounded-full border group-hover:border-sky-600 dark:group-hover:border-stone-900`}
            />
            <div
              className={`${
                self ? "text-sky-600 dark:text-orange-300" : "dark:text-white"
              }  text-md`}
            >
              {user + " " + (self ? `(${t("tickets.ticket.you")})` : "")}
            </div>
          </div>
        </div>
        <div className="flex flex-row overflow-auto gap-1">
          {images == undefined || images.length <= 0
            ? ""
            : images.map((image: any) => (
                <div key={image.imageId} className="flex flex-col">
                  {enlargedImage != undefined &&
                  enlargedImage == image.imageId ? (
                    <div className="">
                      <div
                        onClick={() => setEnlargedImage(0)}
                        className="group flex flex-row items-center translate-y-1/2 -translate-x-1/2 z-50 cursor-pointer absolute top-0 right-0"
                      >
                        <span className="text-white leading-none pb-1">
                          {t("tickets.ticket.close")}
                        </span>
                        <img
                          className="group-hover:scale-110 group-active:scale-90 scale-90 w-[40px] h-[40px] duration-200"
                          src={whiteCrossIcon}
                        />
                      </div>

                      <div className="bg-black/90 z-30 h-full w-full top-0 left-0 absolute" />
                      <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-40 ">
                        <img
                          className="object-contain max-h-[800px] max-w-[1200px]"
                          src={`data:image/jpeg;base64,${image.imageFile}`}
                        />
                        <span className="dark:text-white italic">
                          {image.imageName}
                        </span>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                  <div
                    onClick={() => setEnlargedImage(image.imageId)}
                    className="relative group cursor-pointer"
                  >
                    <div className="opacity-0 group-hover:opacity-100 duration-200 w-full h-full absolute top-0 left-0 z-20 bg-gradient-to-t from-black/40 via-black/20 to-black/40" />
                    <img
                      className="w-[200px] h-[200px] object-cover"
                      src={`data:image/jpeg;base64,${image.imageFile}`}
                    />
                  </div>
                  <span className="italic dark:text-white text-xs w-[200px] overflow-hidden px-1 break-all max-h-[32px]">
                    {image.imageName}
                  </span>
                </div>
              ))}
        </div>
        <p className={"text-md whitespace-pre dark:text-white"}>{message}</p>
      </div>
      <div className={"text-right"}>
        <span className="dark:text-stone-300 text-xs italic ">
          {formattedDate}
        </span>
      </div>
    </div>
  );
}

export default ChatField;
