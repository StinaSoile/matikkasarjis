import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { apiBaseUrl } from "../../constants";
import comicService from "../../services/comicService";

import "../ComicBook/ComicPage.css";
import axios from "axios";

const ComicGallery = () => {
  interface Info {
    comicName: string;
    frontPageImageSrc: string;
    alt: string;
    description: JSX.Element;
  }
  const navigate = useNavigate();

  const [comicInfo, setComicInfo] = useState<Info[]>([]);

  const setComicsWithFrontPages = async (info: Info[]) => {
    try {
      Promise.all(info.map((x) => comicService.getFrontPage(x.comicName))).then(
        (values) => {
          setComicInfo(
            info.map((a, i) => ({
              ...a,
              frontPageImageSrc: `${apiBaseUrl}/images/${a.comicName}/${values[i]}`,
            }))
          );
        }
      );
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.status);
        console.log(error.response);
      } else {
        console.error(error);
      }
    }
  };

  const getComicInfo = async () => {
    const info: Info[] = [];
    try {
      const data = await comicService.getComicInfo();
      for (const comic of data) {
        info.push({
          comicName: comic.shortName,
          frontPageImageSrc: "",
          alt: comic.name,
          description: (
            <div className="div-in-comicgallery">
              <p>{comic.name}</p>
              <p>{comic.level}</p>
            </div>
          ),
        });
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.status);
        console.log(error.response);
      } else {
        console.error(error);
      }
    }
    setComicsWithFrontPages(info);
  };

  useEffect(() => {
    getComicInfo();
  }, []);


  return (
    <div className="list-container center">
      {comicInfo.map((x) => {
        return (
          <div
            key={x.comicName}
            className="list-element-for-comicgallery"
            onClick={() => navigate(`/comics/${x.comicName}`)}
          >
            <img
              src={x.frontPageImageSrc}
              alt={x.alt}
              className="comic-page-in-list shadow"
            />
            {x.description}
          </div>
        );
      })}
    </div>
  );
};

export default ComicGallery;
