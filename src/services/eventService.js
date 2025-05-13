import axios from "axios";

const createEvent = async (data) => {
  try {
    const response = await axios.post(
      "http://localhost:8000/api/v1/events",
      data,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  } catch (err) {
    return err.response.data;
  }
};

const getEvents = async () => {
  try {
    const response = await axios.get("http://localhost:8000/api/v1/events");
    return response.data;
  } catch (err) {
    return err.response.data;
  }
};

const getEventById = async (id) => {
  try {
    const response = await axios.get(
      `http://localhost:8000/api/v1/events/${id}`
    );
    return response.data;
  } catch (err) {
    return err.response.data;
  }
};

const updateEvent = async (id, data) => {
  try {
    const response = await axios.patch(
      `http://localhost:8000/api/v1/events/${id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  } catch (err) {
    return err.response.data;
  }
};

const deleteEvent = async (id) => {
  try {
    const response = await axios.delete(
      `http://localhost:8000/api/v1/events/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    console.log(response.data);

    return response.data;
  } catch (err) {
    return err.response.data;
  }
};

export { createEvent, getEvents, getEventById, updateEvent, deleteEvent };
