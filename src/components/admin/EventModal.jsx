import React, { useEffect } from "react";
import {
  Input,
  Option,
  Select,
  Button,
  Dialog,
  Textarea,
  IconButton,
  Typography,
  DialogBody,
  DialogHeader,
  DialogFooter,
  Spinner,
} from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { PhotoIcon } from "@heroicons/react/24/solid";

import { useFormik } from "formik";
import * as Yup from "yup"; // Import Yup
import { useMutation } from "@tanstack/react-query";
import { createEvent, updateEvent } from "../../services/eventService";
import toast from "react-hot-toast";

// Yup schema definition
const eventSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Event name must be at least 3 characters")
    .max(100, "Event name must not exceed 100 characters")
    .required("Event name is required"),
  description: Yup.string()
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description must not exceed 500 characters")
    .required("Description is required"),
  category: Yup.string()
    .oneOf(
      ["music-concert", "technology-conference", "entertainment"],
      "Invalid category"
    )
    .required("Category is required"),
  date: Yup.date()
    .min(new Date(), "Date must be in the future")
    .required("Date is required"),
  venue: Yup.string()
    .min(3, "Venue must be at least 3 characters")
    .max(200, "Venue must not exceed 200 characters")
    .required("Venue is required"),
  price: Yup.number()
    .min(0, "Price cannot be negative")
    .required("Price is required"),
  image: Yup.string()
    .url("Must be a valid URL")
    .required("Banner URL is required"),
});

export function EventModal({ open, setOpen, event }) {
  const handleOpen = () => setOpen(!open);

  const createMutation = useMutation({
    mutationFn: event ? updateEvent : createEvent,
    onSuccess: (data) => {
      handleOpen();
      formik.resetForm();
      toast.success(data.message);
    },
    onError: (err) => {
      toast.error(err.response.data.message);
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data) => updateEvent(event._id, data),
    onSuccess: (data) => {
      handleOpen();
      formik.resetForm();
      toast.success(data.message);
    },
    onError: (err) => {
      toast.error(err.response.data.message);
    },
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      category: "",
      date: "",
      venue: "",
      price: 0,
      image: "",
    },
    validationSchema: eventSchema, // Add Yup schema
    onSubmit: (values) => {
      if (event) {
        updateMutation.mutate(values);
      } else {
        createMutation.mutate(values);
      }
    },
  });

  useEffect(() => {
    if (event) {
      formik.setValues({
        name: event.name || "",
        image: event.image || "",
        venue: event.venue || "",
        price: event.price || 0,
        description: event.description || "",
        date: event.date
          ? new Date(event.date).toISOString().split("T")[0]
          : "",
        category: event.category || "",
      });
    } else {
      formik.resetForm();
    }
  }, [open, event]);

  return (
    <Dialog size="sm" open={open} handler={handleOpen} className="p-4">
      <form onSubmit={formik.handleSubmit}>
        <DialogHeader className="relative m-0 block">
          <Typography variant="h4" color="blue-gray">
            {event ? "Update Event" : "Create Event"}
          </Typography>
          <Typography className="mt-1 font-normal text-gray-600">
            Keep your records up-to-date and organized.
          </Typography>
          <IconButton
            size="sm"
            variant="text"
            className="!absolute right-3.5 top-3.5"
            onClick={handleOpen}
          >
            <XMarkIcon className="h-4 w-4 stroke-2" />
          </IconButton>
        </DialogHeader>
        <DialogBody className="space-y-4 pb-6">
          <div
            className={`w-[180px] h-[100px] rounded-xl overflow-hidden bg-gray-200 ${
              formik.values.image ? "" : "animate-pulse"
            } flex items-center justify-center`}
          >
            {formik.values.image ? (
              <img
                src={formik.values.image}
                alt="Banner Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <PhotoIcon className="h-8 w-8" />
            )}
          </div>
          <div>
            <Input
              color="gray"
              size="lg"
              id="name"
              name="name"
              label="Name"
              onChange={formik.handleChange}
              value={formik.values.name}
              error={formik.touched.name && formik.errors.name}
              onBlur={formik.handleBlur}
            />
            {formik.touched.name && formik.errors.name && (
              <Typography color="red" variant="small">
                {formik.errors.name}
              </Typography>
            )}
          </div>
          <div>
            <Input
              color="gray"
              size="lg"
              id="image"
              name="image"
              label="Banner URL"
              onChange={formik.handleChange}
              value={formik.values.image}
              error={formik.touched.image && formik.errors.image}
              onBlur={formik.handleBlur}
            />
            {formik.touched.image && formik.errors.image && (
              <Typography color="red" variant="small">
                {formik.errors.image}
              </Typography>
            )}
          </div>
          <div>
            <Input
              color="gray"
              size="lg"
              id="venue"
              name="venue"
              label="Venue"
              onChange={formik.handleChange}
              value={formik.values.venue}
              error={formik.touched.venue && formik.errors.venue}
              onBlur={formik.handleBlur}
            />
            {formik.touched.venue && formik.errors.venue && (
              <Typography color="red" variant="small">
                {formik.errors.venue}
              </Typography>
            )}
          </div>
          <div>
            <Input
              type="number"
              color="gray"
              size="lg"
              id="price"
              name="price"
              label="Price"
              step={100}
              onChange={formik.handleChange}
              value={formik.values.price}
              error={formik.touched.price && formik.errors.price}
              onBlur={formik.handleBlur}
            />
            {formik.touched.price && formik.errors.price && (
              <Typography color="red" variant="small">
                {formik.errors.price}
              </Typography>
            )}
          </div>
          <div>
            <Input
              color="gray"
              size="lg"
              id="date"
              name="date"
              type="date"
              label="Date"
              onChange={formik.handleChange}
              value={formik.values.date}
              error={formik.touched.date && formik.errors.date}
              onBlur={formik.handleBlur}
            />
            {formik.touched.date && formik.errors.date && (
              <Typography color="red" variant="small">
                {formik.errors.date}
              </Typography>
            )}
          </div>
          <div>
            <Select
              label="Category"
              id="category"
              name="category"
              onChange={(value) => formik.setFieldValue("category", value)}
              value={formik.values.category}
              error={formik.touched.category && formik.errors.category}
            >
              <Option value="music-concert">Music Concert</Option>
              <Option value="technology-conference">
                Technology Conference
              </Option>
              <Option value="entertainment">Entertainment</Option>
            </Select>
            {formik.touched.category && formik.errors.category && (
              <Typography color="red" variant="small">
                {formik.errors.category}
              </Typography>
            )}
          </div>
          <div>
            <Textarea
              id="description"
              name="description"
              label="Description"
              onChange={formik.handleChange}
              value={formik.values.description}
              error={formik.touched.description && formik.errors.description}
              onBlur={formik.handleBlur}
            />
            {formik.touched.description && formik.errors.description && (
              <Typography color="red" variant="small">
                {formik.errors.description}
              </Typography>
            )}
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            type="submit"
            className="ml-auto"
            disabled={createMutation.isPending}
          >
            {event ? "Update Event" : "Create Event"}
          </Button>
        </DialogFooter>
      </form>
    </Dialog>
  );
}

export default EventModal;
