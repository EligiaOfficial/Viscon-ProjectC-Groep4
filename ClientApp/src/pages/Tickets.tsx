import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Table from "../components/Table";
import { getArchivedTickets, getTickets } from "../Endpoints/Dto";
import { useTranslation } from "react-i18next";
import axios from "axios";

type TicketsProps = {
  filter: string;
};

function Tickets(props: TicketsProps) {
  const [tickets, setTickets] = useState<any[]>([]);
  const [archive, setArchive] = useState<any[]>([]);

  const { t } = useTranslation();

  const filterTickets = (data: any) => {
    let newData;
    switch (props.filter) {
      case "all":
        newData = data;
        break;
      case "unassigned":
        newData = data.filter((ticket: any) => {
          return ticket["supporter"] == " ";
        });

        break;
      case "critical":
        newData = data.filter((ticket: any) => {
          return ticket["urgent"] == "Yes";
        });
        break;
    }
    newData.length == 0 ? setTickets([""]) : setTickets([...newData]);
  };

  const getArchive = () => {
    getArchivedTickets()
      .then((response: any) => {
        setArchive(response.data);
        if (response.data.length == 0) {
          setArchive([""]);
        }
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  const getData = () => {
    let config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    axios
      .get("/api/ticket/tickets", config)
      .then((response: any) => {
        if (response.data == undefined || response.data.length == 0) {
          setTickets([""]);
          return;
        }
        filterTickets(response.data);
      })
      .catch((error: any) => {
        setTickets([{}]);
        console.log(error);
      });
  };

  useEffect(() => {
    if (localStorage != null && localStorage.getItem("token") != null) {
      if (props.filter != "archive") {
        getData();
      } else {
        getArchive();
      }
    }
  }, [props]);

  return (
    <Layout>
      <div className="flex flex-col">
        <span className="text-2xl py-4 dark:text-white">
          {t(`tickets.title.${props.filter}`)}
        </span>
        <Table
          data={props.filter == "archive" ? archive : tickets}
          uid={"ticketID"}
        />
      </div>
    </Layout>
  );
}

export default Tickets;
