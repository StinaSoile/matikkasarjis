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

export default {
  getFrontPage,
  getPages,
  getPicture,
};
