import { useEffect, useState } from "react";

function Table(props: any) {
  const [keys, setKeys] = useState<string[]>([""]);

  useEffect(() => {
    if (props.data[0] != undefined && props.data[0] != null) {
      setKeys(Object.keys(props.data[0]));
    }
  }, []);

  if (keys.length == 0) {
    return <></>;
  }

  return (
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
              key={item.id}
              className="hover:bg-stone-200 cursor-pointer translate duration-100"
            >
              {keys.map((key) => (
                <td key={item.id + key}>{item[key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
