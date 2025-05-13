import { Card, Typography, Button } from "@material-tailwind/react";
import { MapPinIcon } from "@heroicons/react/24/outline";
import { QrCodeIcon } from "@heroicons/react/24/outline";

const Ticket = ({ ticket, setOpen, setSelectedTicket }) => {
  return (
    <Card
      key={ticket?._id}
      className="shadow-none relative h-[200px] rounded-3xl bg-gray-400 overflow-hidden hover:scale-105 transition-all duration-300"
    >
      {/* Will optimize card background in the future */}
      <img
        src={ticket?.event?.image}
        alt=""
        className="w-full h-full object-cover blur-[110px] absolute top-0 left-0"
        draggable={false}
      />
      <div className="absolute w-[20px] h-[20px] bg-white rounded-full top-1/4 left-0 -translate-y-1/2 -translate-x-1/2 z-10"></div>
      <div className="absolute w-[20px] h-[20px] bg-white rounded-full top-1/4 right-0 -translate-y-1/2 translate-x-1/2 z-10"></div>
      <div className="absolute w-[20px] h-[20px] bg-white rounded-full top-2/4 left-0 -translate-y-1/2 -translate-x-1/2 z-10"></div>
      <div className="absolute w-[20px] h-[20px] bg-white rounded-full top-2/4 right-0 -translate-y-1/2 translate-x-1/2 z-10"></div>
      <div className="absolute w-[20px] h-[20px] bg-white rounded-full top-3/4 left-0 -translate-y-1/2 -translate-x-1/2 z-10"></div>
      <div className="absolute w-[20px] h-[20px] bg-white rounded-full top-3/4 right-0 -translate-y-1/2 translate-x-1/2 z-10"></div>
      <div className="flex h-full z-10">
        <div className="p-6 w-3/4 h-full flex flex-col justify-between">
          <div>
            <Typography variant="h5" color="white">
              {ticket?.event?.name}
            </Typography>
            <Typography variant="small" className="text-blue-gray-50">
              {new Date(ticket?.event?.date).toLocaleString()}
            </Typography>
          </div>
          <div className="flex gap-2 items-center">
            <MapPinIcon color="white" className="w-4 h-4" />
            <Typography variant="small" color="white">
              {ticket?.event?.venue}
            </Typography>
          </div>
        </div>
        <div className="p-6 w-1/4 h-full relative border-l border-dashed border-white flex flex-col justify-center items-center">
          <div className="absolute w-[20px] h-[20px] bg-white rounded-full top-0 left-0 -translate-y-1/2 -translate-x-1/2 z-10"></div>
          <div className="absolute w-[20px] h-[20px] bg-white rounded-full bottom-0 left-0 translate-y-1/2 -translate-x-1/2 z-10"></div>
          <Button
            variant="outlined"
            color="white"
            className="p-2"
            onClick={() => {
              setSelectedTicket(ticket);
              setOpen(true);
            }}
          >
            <QrCodeIcon className="w-6 h-6" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default Ticket;
