import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { apiBaseUrl } from "../../constants";
import comicService from "../../services/comicService";

import "../ComicBook/ComicPage.css";

const ComicGallery = () => {
  const navigate = useNavigate();

  const [comicInfo, setComicInfo] = useState([
    {
      comicName: "siivetonlepakko",
      frontPageImageSrc: "",
      alt: "Siivettömän lepakon matka -sarjakuva",
      description: (
<<<<<<< HEAD
        <div className="div-in-comiclist">
=======
        <div className="div-in-comicgallery">
>>>>>>> be39497 (Did same changes as in connecting backend -branch:)
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
<<<<<<< HEAD
        <div className="div-in-comiclist">
=======
        <div className="div-in-comicgallery">
>>>>>>> be39497 (Did same changes as in connecting backend -branch:)
          <div>Velhon taloudenhoitaja</div>
          <div>Yläkoulun 8. luokka</div>
        </div>
      ),
    },
  ]);

  const getComicFrontPages = async () => {
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
<<<<<<< HEAD
            className="list-element-for-comiclist"
=======
            className="list-element-for-comicgallery"
>>>>>>> be39497 (Did same changes as in connecting backend -branch:)
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
