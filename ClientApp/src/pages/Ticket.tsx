import { useSearchParams } from "react-router-dom";
import { FetchTicketAxios, fetchMessagesAxios } from "../Endpoints/Dto";
import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import TicketInfo from "../components/TicketInfo";
import TicketChat from "../components/TicketChat";

const Ticket = () => {
  const [searchParams] = useSearchParams();
  const ticketId = parseInt(searchParams.get("id") || "", 10);

  if (isNaN(ticketId)) {
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
    await FetchTicketAxios(ticketId)
      .then((res) => {
        //const {
        //  company,
        //  creator,
        //  department,
        //  helper,
        //  machine,
        //  messages,
        //  ticket,
        //} = res.data;

        for (let i = 0; i < messages.length; i++) {
          messages[i].timeSent = new Date(messages[i].timeSent);
        }
        messages.sort((b, a) => a.timeSent.getTime() - b.timeSent.getTime());

        setCompany(res.data.companyName);
        setCreator(res.data.creatorName);
        setDepartment(res.data.departmentName);
        setHelper(res.data.helperName);
        setMachine(res.data.machineName);
        //setMessages(messages);
        setTicket(res.data);

      })
      .catch((err) => console.log(err));

        await fetchMessagesAxios(ticketId)
        .then((res) => {
            for (let i = 0; i < res.data.length; i++) {
              res.data[i].timeSent = new Date(res.data[i].timeSent);
            }
            res.data.sort((b, a) => a.timeSent.getTime() - b.timeSent.getTime());
            console.log("Setting messages");
            setMessages(res.data);
        })
        .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchTicket();
  }, []);

  const fetchMessages = async () => {
    await fetchMessagesAxios(ticketId)
        .then((res) => {
            for (let i = 0; i < res.data.length; i++) {
              res.data[i].timeSent = new Date(messages[i].timeSent);
            }
            messages.sort((b, a) => a.timeSent.getTime() - b.timeSent.getTime());
            console.log("Setting messages");
            setMessages(messages);
        })
        .catch((err) => console.log(err));
  }
  //useEffect(() => { fetchMessages(); }, []);

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
              createdAt={ticket["dateCreated"]}
            />
          ) : null}
          <div className="bg-white dark:bg-stone-400 h-full w-full">
            <section className="flex h-full overflow-y-auto">
              <TicketChat
                ticketId={ticketId}
                ticket={ticket}
                messages={messages}
                setMessages={setMessages}
              />
            </section>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Ticket;
