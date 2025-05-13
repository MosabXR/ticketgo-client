import { useParams } from "react-router-dom";
import { Typography, Button, Chip, Spinner } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getEventById } from "../../services/eventService";
import { toast } from "react-hot-toast";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { createTicket } from "../../services/ticketService";
import { useEffect } from "react";

const Event = () => {
  const { id } = useParams();

  const eventQuery = useQuery({
    queryKey: ["event", id],
    queryFn: () => getEventById(id),
    refetchInterval: 5000,
    refetchOnMount: false,
  });

  const ticketMutation = useMutation({
    mutationFn: () => createTicket(id),
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onError: (err) => {
      toast.error(err.response.data.message);
    },
  });

  eventQuery.isError && toast.error("Failed to get data! Retrying...");

  if (eventQuery.isLoading) {
    return (
      <div className="flex flex-grow flex-col gap-4 justify-center items-center">
        <Spinner />
      </div>
    );
  }

  // Handle case where event is not found
  if (!eventQuery.data?.data?.event) {
    return (
      <div className="flex flex-grow flex-col gap-4 justify-center items-center">
        <Typography variant="h1" className="text-center">
          Oopsie! Resource does not exist.
        </Typography>
        <Link to="/">
          <Button variant="outlined" className="flex gap-2 items-center">
            <ArrowLeftIcon className="w-4 h-4" />
            Go Back
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <>
      {/* Event Image */}
      <div className="w-full h-[400px] bg-gray-200 rounded-3xl overflow-hidden mb-6">
        <img
          src={eventQuery.data?.data?.event?.image}
          alt={eventQuery.data?.data?.event?.name}
          className="w-full h-full object-cover"
          draggable={false}
        />
      </div>

      {/* Event Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <Typography variant="h2" className="mb-4">
            {eventQuery.data?.data?.event?.name}
          </Typography>
          <Typography variant="lead" color="gray" className="mb-6">
            {eventQuery.data?.data?.event?.description}
          </Typography>
        </div>

        <div className="md:col-span-1">
          <div className="bg-gray-100 p-6 rounded-xl shadow-md">
            <Typography variant="h5" className="mb-4">
              Event Details
            </Typography>
            <div className="space-y-3">
              <div>
                <Typography
                  variant="small"
                  color="gray"
                  className="font-semibold"
                >
                  Date & Time
                </Typography>
                <Typography
                  variant="small"
                  color="gray"
                  className="font-semibold"
                >
                  {new Date(
                    eventQuery.data?.data?.event?.date
                  ).toLocaleString()}
                </Typography>
              </div>
              <div>
                <Typography
                  variant="small"
                  color="gray"
                  className="font-semibold"
                >
                  Venue
                </Typography>
                <Typography variant="paragraph">
                  {eventQuery.data?.data?.event?.venue}
                </Typography>
              </div>
              <div>
                <Typography
                  variant="small"
                  color="gray"
                  className="font-semibold"
                >
                  Category
                </Typography>
                <Chip
                  value={eventQuery.data?.data?.event?.category}
                  className="inline-block mt-1"
                />
              </div>
              <div>
                <Typography
                  variant="small"
                  color="gray"
                  className="font-semibold"
                >
                  Price
                </Typography>
                <Typography variant="paragraph">
                  ${eventQuery.data?.data?.event?.price.toFixed(2)}
                </Typography>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Button
                fullWidth
                className="mt-6"
                onClick={ticketMutation.mutate}
              >
                Get Ticket
              </Button>
              <Link to="/">
                <Button variant="outlined" fullWidth>
                  Back
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Event;
