import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { apiBaseUrl } from "../../constants";
import comicService from "../../services/comicService";

import "../ComicBook/ComicPage.css";
import axios from "axios";

const ComicGallery = () => {
  const navigate = useNavigate();

  const [comicInfo, setComicInfo] = useState([
    {
      comicName: "siivetonlepakko",
      frontPageImageSrc: "",
      alt: "Siivettömän lepakon matka -sarjakuva",
      description: (
        <div className="div-in-comicgallery">
          <p>Siivettömän lepakon matka</p>
          <p>4. luokka</p>
        </div>
      ),
    },
    {
      comicName: "velhontaloudenhoitaja",
      frontPageImageSrc: "",
      alt: "Velhon taloudenhoitaja -sarjakuva",
      description: (
        <div className="div-in-comicgallery">
          <div>Velhon taloudenhoitaja</div>
          <div>Yläkoulun 8. luokka</div>
        </div>
      ),
    },
  ]);

  const getComicFrontPages = async () => {
    try {
      Promise.all(
        comicInfo.map((x) => comicService.getFrontPage(x.comicName))
      ).then((values) => {
        setComicInfo(
          comicInfo.map((a, i) => ({
            ...a,
            frontPageImageSrc: `${apiBaseUrl}/images/${a.comicName}/${values[i]}`,
          }))
        );
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.status);
        console.log(error.response);
      } else {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    getComicFrontPages();
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
