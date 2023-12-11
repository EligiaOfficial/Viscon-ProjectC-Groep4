import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Table from "../components/Table";
import { getTickets } from "../Endpoints/Dto";
import { useTranslation } from "react-i18next";

type TicketsProps = {
  filter: string;
};

function Tickets(props: TicketsProps) {
  const [tickets, setTickets] = useState<[]>([]);
  const [title, setTitle] = useState<string>("");

  const { t } = useTranslation();

  const filterTickets = (data: any) => {
    switch (props.filter) {
      case "all":
        setTickets(data);
        break;
      case "unassigned":
        setTickets(
          data.filter((ticket: any) => {
            return ticket["supporter"] == " ";
          })
        );
        break;
      case "critical":
        setTickets(
          data.filter((ticket: any) => {
            return ticket["urgent"] == "true";
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
          {t(`tickets.title.${props.filter}`)}
        </span>
        <Table data={tickets} uid={"ticketID"} />
      </div>
    </Layout>
  );
}

export default Tickets;
