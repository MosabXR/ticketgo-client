import axios from "axios";

const signUp = async (data) => {
  try {
    const response = await axios.post(
      "http://localhost:8000/api/v1/users/signup",
      data
    );
    return response.data;
  } catch (err) {
    return err.response.data;
  }
};

const signIn = async (data) => {
  try {
    const response = await axios.post(
      "http://localhost:8000/api/v1/users/signin",
      data
    );
    return response.data;
  } catch (err) {
    return err.response.data;
  }
};

export { signUp, signIn };
