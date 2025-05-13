import DefaultCarousel from "../../components/common/DefaultCarousel";
import { Spinner, Typography } from "@material-tailwind/react";
import DefaultCard from "../../components/common/DefaultCard";
import { useQuery } from "@tanstack/react-query";
import { getEvents } from "../../services/eventService";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const Home = () => {
  const eventsQuery = useQuery({
    queryKey: ["events"],
    queryFn: () => getEvents(),
    refetchInterval: 5000,
    refetchOnMount: false,
  });

  eventsQuery.isError && toast.error("Failed to get data! Retrying...");

  return (
    <>
      <DefaultCarousel events={eventsQuery?.data?.data?.events} />
      <Typography variant="h3">Upcoming Events</Typography>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {eventsQuery.isLoading && (
          <div className="col-span-full flex justify-center items-center">
            <Spinner />
          </div>
        )}
        {eventsQuery?.data?.data?.events.map((event) => (
          <DefaultCard key={event._id} event={event} />
        ))}
      </div>
    </>
  );
};

export default Home;
