import { useState } from "react";
import { Typography, Spinner } from "@material-tailwind/react";
import DefaultTicket from "../../components/common/DefaultTicket";
import TicketModal from "../../components/common/TicketModal";
import { useQuery } from "@tanstack/react-query";
import { getTickets } from "../../services/ticketService";
import { toast } from "react-hot-toast";

const Tickets = () => {
  const [open, setOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const ticketsQuery = useQuery({
    queryKey: ["tickets"],
    queryFn: () => getTickets(),
    refetchInterval: 5000,
    refetchOnMount: false,
  });

  ticketsQuery.isError && toast.error("Failed to get data! Retrying...");

  if (ticketsQuery.isLoading) {
    return (
      <div className="flex flex-grow flex-col gap-4 justify-center items-center">
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <Typography variant="h3">Your Tickets</Typography>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {ticketsQuery?.data?.data?.tickets.map((ticket) => (
          <DefaultTicket
            key={ticket._id}
            ticket={ticket}
            setOpen={setOpen}
            setSelectedEvent={setSelectedEvent}
          />
        ))}
        <TicketModal
          open={open}
          setOpen={setOpen}
          ticket={selectedTicket}
          event={selectedEvent}
        />
      </div>
    </>
  );
};

export default Tickets;
