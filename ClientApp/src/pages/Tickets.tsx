import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Table from "../components/Table";
import { getTickets } from "../Endpoints/Dto";

function Tickets() {
  const [tickets, setTickets] = useState<[]>([]);

  useEffect(() => {
    getTickets()
      .then((response: any) => {
        if (response.data.length > 0) {
          setTickets(response.data);
        }
      })
      .catch((error: any) => {
        console.log(error);
      });
  }, []);

  return (
    <Layout>
      <div className="flex flex-col">
        <span className="text-2xl py-4">Tickets</span>
        <Table data={tickets} uid={"ticketID"} />
      </div>
    </Layout>
  );
}

export default Tickets;
