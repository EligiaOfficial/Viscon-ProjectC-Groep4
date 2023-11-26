import { useEffect, useState } from "react";
import Nav from "../components/Nav";
import SideBar from "../components/SideBar";
import Table from "../components/Table";
import axios from "axios";
import { getTickets } from "../Endpoints/Dto";
import Layout from "../components/Layout";

function Dashboard() {
  const [tickets, setTickets] = useState<[]>([]);

  useEffect(() => {
    getTickets()
      .then((response) => {
        if (response.data.length > 0) {
          setTickets(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <Layout>
        <div className="h-full w-full overflow-y-auto">
          <div className="p-2 flex flex-col gap-4 w-full">
            <span className="text-2xl">Dashboard</span>
            <Table data={tickets} uid={"ticketID"} />
          </div>
        </div>
      </Layout>
    </>
  );
}

export default Dashboard;
