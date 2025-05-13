import { useQuery, useMutation } from "@tanstack/react-query";
import { getTicketById, claimTicket } from "../../services/ticketService";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";
import { Typography, Button } from "@material-tailwind/react";
import DefaultTicket from "../../components/common/DefaultTicket";

const Ticket = () => {
  const { id } = useParams();

  const ticketQuery = useQuery({
    queryKey: ["ticket", id],
    queryFn: () => getTicketById(id),
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (err) => {
      toast.error(err.response.data.message);
    },
    refetchInterval: 1000,
  });

  ticketQuery.isError && toast.error("Failed to get data! Retrying...");

  const claimTicketMutation = useMutation({
    mutationFn: () => claimTicket(id),
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onError: (err) => {
      toast.error(err.response.data.message);
    },
  });

  return (
    <>
      <div className="flex justify-between items-center">
        <Typography variant="h3">Ticket</Typography>
        <Button
          className="w-fit"
          onClick={() => claimTicketMutation.mutate()}
          disabled={
            claimTicketMutation.isPending ||
            ticketQuery.data?.data?.ticket?.isClaimed
          }
        >
          {ticketQuery.data?.data?.ticket?.isClaimed
            ? "Already Claimed"
            : "Claim Ticket"}
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <DefaultTicket
          key={ticketQuery.data?.data?.ticket._id}
          ticket={ticketQuery.data?.data?.ticket}
        />
      </div>
    </>
  );
};

export default Ticket;
