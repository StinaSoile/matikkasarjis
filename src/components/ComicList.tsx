import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { apiBaseUrl } from "../constants";
import comicService from "../services/comicService";

import "./ComicPage.css";

const ComicList = () => {
  interface LooseObject {
    [key: string]: string;
  }

  const navigate = useNavigate();

  const [comicFrontPages, setComicFrontPages] = useState<LooseObject>({
    siivetonlepakko: "",
    velhontaloudenhoitaja: "",
  });

  const getComicFrontPages = async () => {
    const newComicFrontPages: LooseObject = { ...comicFrontPages };

    for (const [comic] of Object.entries(comicFrontPages)) {
      await comicService
        .getFrontPage(comic)
        .then(
          (frontpage) =>
            (newComicFrontPages[
              comic
            ] = `${apiBaseUrl}/images/${comic}/${frontpage}`)
        );
    }
    setComicFrontPages(newComicFrontPages);
  };

  useEffect(() => {
    getComicFrontPages();
  }, []);
  return (
    <div className="list-container center">
      <div
        className="list-element-for-comiclist"
        onClick={() => navigate(`/comics/siivetonlepakko`)}
      >
        <img
          src={comicFrontPages.siivetonlepakko}
          alt="Siivettömän lepakon matka -sarjakuva"
          className="comic-page-in-list shadow"
        />
        <div className="div-in-comiclist">
          <p>Siivettömän lepakon matka</p>
          <p>4. luokka</p>
        </div>
      </div>

      <div
        className="list-element-for-comiclist"
        onClick={() => navigate("/comics/velhontaloudenhoitaja")}
      >
        <img
          src={comicFrontPages.velhontaloudenhoitaja}
          alt="Velhon taloudenhoitaja -sarjakuva"
          className="comic-page-in-list shadow"
        />
        <div className="div-in-comiclist">
          <div>Velhon taloudenhoitaja</div>
          <div>Yläkoulun 8. luokka</div>
        </div>
      </div>
    </div>
  );
};

export default ComicList;
