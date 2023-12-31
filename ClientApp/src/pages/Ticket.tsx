import { useSearchParams } from "react-router-dom";
import { FetchTicketAxios } from "../Endpoints/Dto";
import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import TicketInfo from "../components/TicketInfo";
import TicketChat from "../components/TicketChat";

const Ticket = () => {
  const [searchParams] = useSearchParams();
  const Id = searchParams.get("id") || " ";
  const TicketId = parseInt(Id, 10);
  if (isNaN(TicketId)) {
    return <div>Invalid Ticket</div>;
  }

  const [ticket, setTicket] = useState<object>([]);
  const [department, setDepartment] = useState<string>("");
  const [creator, setCreator] = useState<string>("");
  const [helper, setHelper] = useState<string>("");
  const [company, setCompany] = useState<string>("");
  const [machine, setMachine] = useState<string>("");
  const [messages, setMessages] = useState<object[]>([]);

  const fetchTicket = async () => {
    await FetchTicketAxios(TicketId)
      .then((res) => {
        const {
          company,
          creator,
          department,
          helper,
          machine,
          messages,
          ticket,
        } = res.data;
        setCompany(company);
        setCreator(creator);
        setDepartment(department);
        setHelper(helper);
        setMachine(machine);
        setMessages(messages);
        setTicket(ticket);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchTicket();
  }, []);

  return (
    <>
      <Layout>
        <div key="Ticket" className="flex flex-row h-full">
          {ticket["urgent"] !== undefined ? (
            <TicketInfo
              assignee={helper}
              company={company}
              department={department}
              machine={machine}
              requester={creator}
              urgent={ticket["urgent"]}
              published={ticket["published"]}
              resolved={ticket["resolved"]}
            />
          ) : null}
          <div className="bg-stone-200 h-full w-full">
            <section className="flex h-full overflow-y-auto">
              <TicketChat ticket={ticket} messages={messages || []} />
            </section>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Ticket;
