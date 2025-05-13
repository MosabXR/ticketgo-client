import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
  IconButton,
} from "@material-tailwind/react";

import QRCode from "react-qr-code";

import { XMarkIcon, ArrowDownTrayIcon } from "@heroicons/react/24/outline";

const TicketModal = ({ open, setOpen, ticket }) => {
  const handleOpen = () => setOpen(!open);

  return (
    <Dialog
      size="sm"
      open={open}
      handler={handleOpen}
      className="p-4"
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0.9, y: -100 },
      }}
    >
      <DialogHeader className="relative m-0 block">
        <IconButton
          size="sm"
          variant="text"
          className="!absolute right-3.5 top-3.5"
          onClick={handleOpen}
        >
          <XMarkIcon className="h-4 w-4 stroke-2" />
        </IconButton>
      </DialogHeader>
      <DialogBody className="space-y-4 pb-6 flex justify-center items-center">
        <QRCode
          value={`https://ticketgo-gold.vercel.app/ticket/${ticket?._id}`}
          size={200}
        />
      </DialogBody>
      <DialogFooter className="flex flex-col gap-4 justify-center items-center">
        <Typography variant="h4" color="black" className="text-center">
          {ticket?.event?.name}
        </Typography>
        <Button className="flex justify-center items-center gap-2" disabled>
          <ArrowDownTrayIcon className="h-4 w-4 stroke-2" />
          Download Ticket
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default TicketModal;
