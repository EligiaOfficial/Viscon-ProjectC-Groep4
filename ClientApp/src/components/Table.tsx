import { useEffect, useState } from "react";

type TableProps = {
  data: any[];
  uid: string;
};

function Table(props: TableProps) {
  const [keys, setKeys] = useState<string[]>([]);
  const [dataRendered, setDataRendered] = useState<boolean>(false);

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
                  <th key={key}>{key}</th>
                ))}
              </tr>
              {props.data.map((item: any) => (
                <tr
                  key={item[props.uid]}
                  className="hover:bg-stone-200 cursor-pointer translate duration-100"
                >
                  {keys.map((key) => (
                    <td key={item[props.uid] + key}>{item[key]}</td>
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
