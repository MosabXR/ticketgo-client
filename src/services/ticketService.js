import axios from "axios";

const createTicket = async (id) => {
  try {
    const response = await axios.post(
      `http://localhost:8000/api/v1/tickets/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  } catch (err) {
    console.log(err);

    return err.response.data;
  }
};

const getTickets = async () => {
  try {
    const response = await axios.get("http://localhost:8000/api/v1/tickets", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (err) {
    return err.response.data;
  }
};

const getTicketById = async (id) => {
  try {
    const response = await axios.get(
      `http://localhost:8000/api/v1/tickets/${id}`
    );
    return response.data;
  } catch (err) {
    return err.response.data;
  }
};

const claimTicket = async (id) => {
  try {
    const response = await axios.patch(
      `http://localhost:8000/api/v1/tickets/${id}/claim`
    );
    return response.data;
  } catch (err) {
    console.log(err.response.data);

    return err.response.data;
  }
};

// const deleteTicket = async (ticketId) => {
//   const response = await axios.delete(`/api/tickets/${ticketId}`);
//   return response.data;
// };

export { createTicket, getTickets, getTicketById, claimTicket };
