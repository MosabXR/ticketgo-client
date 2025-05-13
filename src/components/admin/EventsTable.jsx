import {
  PencilIcon,
  PlusIcon,
  MagnifyingGlassIcon,
  TrashIcon,
  StarIcon,
} from "@heroicons/react/24/outline";
// import { StarIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";

import { useState } from "react";
import { EventModal } from "./EventModal";
import { getEvents, deleteEvent } from "../../services/eventService";
import { useQuery, useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

// const TABS = [
//   {
//     label: "All",
//     value: "all",
//   },
//   {
//     label: "Monitored",
//     value: "monitored",
//   },
//   {
//     label: "Unmonitored",
//     value: "unmonitored",
//   },
// ];

const TABLE_HEAD = ["Banner", "Details", "Status", "Date", "Price", "Actions"];

const EventsTable = () => {
  const [open, setOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);

  const eventsQuery = useQuery({
    queryKey: ["events"],
    queryFn: () => getEvents(),
    refetchInterval: 1000,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      console.log(data);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => deleteEvent(id),
    onSuccess: (data) => {
      toast.success("Event deleted successfully");
      eventsQuery.refetch();
    },
    onError: (err) => {
      toast.error(err.response.data.message);
    },
  });

  return (
    <Card className="h-screen w-full flex flex-col rounded-none">
      <CardHeader floated={false} shadow={false} className="rounded-none pb-8">
        <div className="flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              Events List
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              See information about all events
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            {/* <Button variant="outlined" size="sm">
              view all
            </Button> */}
            <Button
              className="flex items-center gap-3"
              size="sm"
              onClick={() => {
                setCurrentEvent(null);
                setOpen(true);
              }}
            >
              <PlusIcon strokeWidth={2} className="h-4 w-4" /> Create event
            </Button>
          </div>
        </div>
        {/* <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <Tabs value="all" className="w-full md:w-max">
            <TabsHeader>
              {TABS.map(({ label, value }) => (
                <Tab key={value} value={value}>
                  &nbsp;&nbsp;{label}&nbsp;&nbsp;
                </Tab>
              ))}
            </TabsHeader>
          </Tabs>
          <div className="w-full md:w-72">
            <Input
              label="Search"
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
            />
          </div>
        </div> */}
      </CardHeader>
      <CardBody className="overflow-scroll flex-grow p-0">
        <table className="mt-4 w-full min-w-max table-auto text-left flex-grow">
          <thead className="sticky top-0 bg-gray-200 z-10">
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="flex-grow">
            {eventsQuery.data?.data?.events.map((event, index) => {
              const isLast =
                index === eventsQuery.data?.data?.events.length - 1;
              const classes = isLast
                ? "p-4"
                : "p-4 border-b border-blue-gray-50";

              return (
                <tr key={event._id}>
                  <td className={`${classes} w-0`}>
                    <div className="w-[180px] h-[100px] rounded-xl overflow-hidden">
                      <img
                        src={event.image}
                        alt={event.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </td>
                  <td className={classes}>
                    <div className="flex flex-col">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {event.name}
                      </Typography>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal opacity-70"
                      >
                        {event.venue}
                      </Typography>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal opacity-70"
                      >
                        {event.description}
                      </Typography>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal opacity-70"
                      >
                        {event.category}
                      </Typography>
                    </div>
                  </td>
                  <td className={classes}>
                    <div className="w-max">
                      <Chip
                        variant="ghost"
                        size="sm"
                        value={
                          new Date(event.date) > new Date()
                            ? "active"
                            : "expired"
                        }
                        color={
                          new Date(event.date) > new Date() ? "green" : "red"
                        }
                      />
                    </div>
                  </td>
                  <td className={classes}>
                    <div className="w-max">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {new Date(event.date).toLocaleDateString()}
                      </Typography>
                    </div>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {event.price > 0 ? `${event.price} LE` : "FREE"}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <div className="flex gap-2">
                      <Tooltip content="Edit Event">
                        <IconButton
                          variant="text"
                          onClick={() => {
                            setCurrentEvent(event);
                            setOpen(true);
                          }}
                        >
                          <PencilIcon className="h-4 w-4" />
                        </IconButton>
                      </Tooltip>
                      {/* <Tooltip content="Feature Event">
                        <IconButton variant="text">
                          <StarIcon className="h-4 w-4" />
                        </IconButton>
                      </Tooltip> */}
                      <Tooltip content="Delete Event">
                        <IconButton
                          variant="text"
                          onClick={() => deleteMutation.mutate(event._id)}
                          disabled={deleteMutation.isPending}
                        >
                          <TrashIcon className="h-4 w-4" />
                        </IconButton>
                      </Tooltip>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </CardBody>
      {/* <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          Page 1 of 10
        </Typography>
        <div className="flex gap-2">
          <Button variant="outlined" size="sm">
            Previous
          </Button>
          <Button variant="outlined" size="sm">
            Next
          </Button>
        </div>
      </CardFooter> */}
      <EventModal open={open} setOpen={setOpen} event={currentEvent} />
    </Card>
  );
};

export default EventsTable;
