import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import {
  ArrowLongRightIcon,
  BanknotesIcon,
  CalendarDaysIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
export function DefaultCard({ event }) {
  return (
    <Card className="mt-6">
      <CardHeader color="bg-gray-200" className="relative h-72 bg-gray-200">
        <img
          src={event.image}
          alt={event.name}
          className="w-full h-full object-cover"
          draggable={false}
        />
      </CardHeader>
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-2">
          {event.name}
        </Typography>
      </CardBody>
      <CardFooter className="pt-0 flex-grow flex items-end justify-between">
        <Link to={`/event/${event._id}`}>
          <Button className="flex gap-2 items-center">
            Get Tickets
            <ArrowLongRightIcon className="w-4 h-4" />
          </Button>
        </Link>
        <Typography color="blue-gray" className="font-medium">
          {event.price > 0 ? `${event.price} LE` : "FREE"}
        </Typography>
      </CardFooter>
    </Card>
  );
}

export default DefaultCard;
