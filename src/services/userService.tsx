import axios from "axios";
import { apiBaseUrl } from "../constants";

const authenticateUser = async (username: string, password: string) => {
  console.log(username, password);
  const response = await axios.post(`${apiBaseUrl}/login`, {
    username: username,
    password: password,
    progress: [],
  });
  return response.data;
};

export default {
  authenticateUser,
};
