import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Table from "../components/Table";
import { getTickets } from "../Endpoints/Dto";

function Tickets() {
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
    <Layout>
      <span className="text-2xl">Tickets</span>
      <Table data={tickets} uid={"ticketID"} />
    </Layout>
  );
}

export default Tickets;
