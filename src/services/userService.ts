import axios from "axios";
import { apiBaseUrl } from "../constants";
import utils from "../utils";

const authenticateUser = async (username: string, password: string) => {
  const response = await axios.post(`${apiBaseUrl}/login`, {
    username: username,
    password: password,
    progress: [],
  });
  return response.data;
};

const saveProgress = async (comicName: string, key: string) => {
  const username = window.localStorage.getItem("username");
  let token = window.localStorage.getItem("token");
  token = `Bearer ${token}`;
  const progressString = window.localStorage.getItem("progress");

  const request = {
    username: username,
    progress: [] as {
      comic: string;
      key: string;
    }[],
  };
  let progress: {
    comic: string;
    key: string;
  }[] = [];
  progress = utils.parseAndValidateProgress(progressString);
  let found = false;
  for (const item of progress) {
    if (item.comic === comicName) {
      item.key = key;
      found = true;
      break;
    }
  }
  if (found === false) {
    progress.push({ comic: comicName, key: key });
  }

  request.progress = progress;

  const config = { headers: { Authorization: token } };
  const response = await axios.post(
    `${apiBaseUrl}/users/save`,
    request,
    config
  );
  return response.data;
};

const createUser = async (
  username: string,
  email: string,
  password: string
) => {
  await axios.post(`${apiBaseUrl}/users`, {
    username: username,
    email: email,
    password: password,
    progress: [],
  });
  return;
};

export default {
  authenticateUser,
  saveProgress,
  createUser,
};
