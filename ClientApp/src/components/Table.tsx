import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import arrowIcon from "../assets/arrow.svg";

type TableProps = {
  data: any[];
  uid: string;
};

function Table(props: TableProps) {
  const [keys, setKeys] = useState<string[]>([]);
  const [dataRendered, setDataRendered] = useState<boolean>(false);
  const nav = useNavigate();
  const [sort, setSort] = useState<string>("");
  const [ascending, setAscending] = useState<boolean>(true);

  useEffect(() => {
    if (
      props.data != undefined &&
      props.data != null &&
      props.data.length > 0 &&
      !dataRendered
    ) {
      setKeys(Object.keys(props.data[0]));
      setSort(Object.keys(props.data[0])[0]);
      setDataRendered(true);
    }
  }, [props]);

  const sortData = (key: string, ascend: boolean) => {
    if (typeof props.data[0][key] === "number") {
      if (ascend) {
        props.data.sort((a, b) => a[key] - b[key]);
      } else {
        props.data.sort((a, b) => b[key] - a[key]);
      }
    } else {
      if (ascend) {
        props.data.sort((a, b) => a[key].localeCompare(b[key]));
      } else {
        props.data.sort((a, b) => b[key].localeCompare(a[key]));
      }
    }
  };

  const handleSort = (key: string) => {
    if (sort == key) {
      setAscending(!ascending);
      sortData(key, !ascending);
    } else {
      setAscending(true);
      sortData(key, true);
    }
    setSort(key);
  };

  return (
    <>
      {!dataRendered || props.data == undefined ? (
        <>No data to show.</>
      ) : (
        <div className="flex flex-col gap-4">
          <div className="flex flex-row">
            <div className="active:scale-95 select-none border border-black rounded-md p-1 bg-white cursor-pointer hover:bg-stone-600 hover:text-white hover:border-white">
              +Add filter
            </div>
          </div>
          <div className="bg-white w-full">
            <table className="w-full select-none">
              <tbody>
                <tr className="text-left">
                  {keys.map((key) => (
                    <th
                      className={`${
                        key == sort
                          ? "bg-stone-400 hover:bg-stone-300"
                          : "hover:bg-stone-300"
                      } active:bg-white duration-300 p-1 cursor-pointer border-x border-stone-300`}
                      onClick={() => handleSort(key)}
                      key={key}
                    >
                      <div className="flex flex-row justify-between">
                        <span className="">
                          {key.charAt(0).toUpperCase() + key.slice(1)}
                        </span>
                        <img
                          className={`translate duration-200 min-w-[24px] max-w-[24px]`}
                          src={key == sort ? arrowIcon : ""}
                          style={{ transform: ascending ? "" : "scaleY(-1)" }}
                        />
                      </div>
                    </th>
                  ))}
                </tr>
                {props.data.map((item: any) => (
                  <tr
                    key={item[props.uid]}
                    className="hover:bg-stone-300 cursor-pointer translate duration-100 border-y border-stone-200 active:bg-stone-100"
                    onClick={() => nav(`/ticket?id=${item[props.uid]}`)}
                  >
                    {keys.map((key) => (
                      <td className="p-1 " key={item[props.uid] + key}>
                        {key === "created"
                          ? // Format the date if the key is 'date'
                            (() => {
                              const date = new Date(item[key]);
                              return new Intl.DateTimeFormat("en-GB", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              }).format(date);
                            })()
                          : // Display the value as is for other keys
                            item[key]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}

export default Table;
