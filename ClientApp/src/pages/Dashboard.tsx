import { useEffect } from "react";
import Nav from "../components/Nav";
import SideBar from "../components/SideBar";
import Table from "../components/Table";
import Utils from "../utils/Utils";

function Dashboard() {
  const dataLength: number = 100;

  let data: any[] = [];

  useEffect(() => {
    for (let i = 1; data.length < dataLength; i++) {
      const newEntry = {
        id: i,
        firstname: Utils.generateString(5),
        lastname: Utils.generateString(10),
        age: Utils.generateInt(100),
        height: Utils.generateInt(200),
        case: Utils.generateString(10),
        date: "25-11-2023",
      };
      data.push(newEntry);
    }
  }, []);

  return (
    <>
      <div className="h-screen flex flex-col">
        <Nav />
        <div className="relative flex flex-row h-full w-full overflow-y-hidden">
          <SideBar />
          <div className="bg-stone-200 h-full w-full overflow-y-auto">
            <div className="p-2 flex flex-col gap-4 w-full">
              <span className="text-2xl">Dashboard</span>
              <Table data={data} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
