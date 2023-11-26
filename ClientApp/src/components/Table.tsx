import { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";

type TableProps = {
  data: any[];
  uid: string;
};

function Table(props: TableProps) {
  const [keys, setKeys] = useState<string[]>([]);
  const [dataRendered, setDataRendered] = useState<boolean>(false);
  const nav = useNavigate();
  
  useEffect(() => {
    if (
      props.data != undefined &&
      props.data != null &&
      props.data.length > 0 &&
      !dataRendered
    ) {
      setKeys(Object.keys(props.data[0]));
      setDataRendered(true);
    }
  }, [props]);

  return (
    <>
      {!dataRendered || props.data == undefined ? (
        <>No data to show.</>
      ) : (
        <div className="bg-white w-full p-2">
          <table className="w-full">
            <tbody>
              <tr className="text-left">
                {keys.map((key) => (
                  <th key={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</th>
                ))}
              </tr>
              {props.data.map((item: any) => (
                <tr
                  key={item[props.uid]}
                  className="hover:bg-stone-200 cursor-pointer translate duration-100"
                  onClick={() => nav(`/ticket?id=${item[props.uid]}`)}
                >
                  {keys.map((key) => (
                      <td key={item[props.uid] + key}>
                        {key === 'created' ?
                            // Format the date if the key is 'date'
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
                            :
                            // Display the value as is for other keys
                            item[key]
                        }
                      </td>
                 ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

export default Table;
