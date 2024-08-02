import axios from "axios";
import { apiBaseUrl } from "../constants";

const getFrontPage = async (comicName: string) => {
  const key = await axios.post(`${apiBaseUrl}/comics/${comicName}/0`);
  const pages = await axios.get(
    `${apiBaseUrl}/comics/${comicName}?key=${key.data}`
  );
  return pages.data[0].pictureName;
};

const getPages = async (comicName: string, key: string | undefined) => {
  let pages;
  if (!key) {
    const firstKey = await axios.post(`${apiBaseUrl}/comics/${comicName}/0`);
    pages = await axios.get(
      `${apiBaseUrl}/comics/${comicName}?key=${firstKey.data}`
    );
  } else {
    pages = await axios.get(`${apiBaseUrl}/comics/${comicName}?key=${key}`);
  }
  return pages.data;
};

const getPicture = async (name: string) => {
  const picture = await axios.get(`${apiBaseUrl}/images/${name}`);
  return picture;
};

const postAnswers = async (name: string, page: number, answers: string[]) => {
  const key = await axios.post(`${apiBaseUrl}/comics/${name}/${page}`, answers);
  return key.data as string;
};

export default {
  getFrontPage,
  getPages,
  getPicture,
  postAnswers,
};
