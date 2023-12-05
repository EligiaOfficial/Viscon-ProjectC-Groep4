import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Table from "../components/Table";
import { getTickets } from "../Endpoints/Dto";

type TicketsProps = {
  filter: string;
};

function Tickets(props: TicketsProps) {
  const [tickets, setTickets] = useState<[]>([]);

  const filterTickets = (data: any) => {
    switch (props.filter) {
      case "all":
        setTickets(data);
        break;
      case "new":
        setTickets(
          data.filter((ticket: any) => {
            return ticket["supporter"] == " ";
          })
        );
        break;
      case "critical":
        setTickets(
          data.filter((ticket: any) => {
            return ticket["urgent"] == "Yes";
          })
        );
        break;
      case "archive":
        setTickets(
          data.filter((ticket: any) => {
            return ticket["status"] == "closed";
          })
        );
        break;
    }
  };

  const getData = () => {
    getTickets()
      .then((response: any) => {
        if (response.data.length > 0) {
          filterTickets(response.data);
        }
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getData();
  }, [props]);

  return (
    <Layout>
      <div className="flex flex-col">
        <span className="text-2xl py-4 dark:text-white">
          {props.filter.charAt(0).toUpperCase() + props.filter.slice(1)} Tickets
        </span>
        <Table data={tickets} uid={"ticketID"} />
      </div>
    </Layout>
  );
}

export default Tickets;
