import "./ComicPage.css";

import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useEffect, useState } from "react";
import ComicPageView from "./ComicPageView";
import { IconButton } from "@mui/material";
import comicService from "../../services/comicService";
import { Page } from "../../types";
import { apiBaseUrl } from "../../constants";
import axios from "axios";

const ComicBook = ({ comicName }: { comicName: string }) => {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [comic, setComic] = useState<Page[]>([]);
  const [stateKey, setKey] = useState<string | undefined>(undefined);
  useEffect(() => {
    const getPages = async (comicName: string, key: string | undefined) => {
      try {
        comicService.getPages(comicName, key).then((data) => setComic(data));
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log(error.status);
          console.log(error.response);
        } else {
          console.error(error);
        }
      }
    };
    getPages(comicName, stateKey);
    console.log(stateKey);
    const element = document.getElementById(page.toString());
    element?.scrollIntoView({ block: "center" });
    function keyDownHandler(e: globalThis.KeyboardEvent) {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        handleIncrement();
      }
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        handleDecrement();
      }
      if (e.key === "Enter") {
        e.preventDefault();
        renderComicPageModal(page);
      }
    }

    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, [page, stateKey]);

  const renderComicPageModal = (p: number) => {
    setPage(p);
    setOpen(true);
  };

  const handleIncrement = () => {
    const newPageNumber = page + 1;
    if (newPageNumber >= 0 && newPageNumber < comic.length) {
      setPage(newPageNumber);
    }
  };
  const handleDecrement = () => {
    const newPageNumber = page - 1;
    if (newPageNumber >= 0 && newPageNumber < comic.length) {
      setPage(newPageNumber);
    }
  };

  return (
    <>
      <IconButton style={{ minWidth: "3rem", minHeight: "3rem", zIndex: 1000 }}>
        <Link to="/">
          <ArrowBackIcon
            fontSize="large"
            color="secondary"
            className="fixed-top-left"
          />
        </Link>
      </IconButton>
      <div className="list-container">
        {comic.map((item, i) => {
          const imageSrc = `${apiBaseUrl}/images/${comicName}/${item.pictureName}`;
          let classname = "list-element-for-pages";
          if (page === i) {
            classname = "list-element-for-pages focused";
          }

          return (
            <div
              key={item.pictureName}
              id={i.toString()}
              className={classname}
              onClick={() => renderComicPageModal(i)}
            >
              <img
                src={imageSrc}
                alt="sarjakuvasivu"
                className="comic-page-in-list"
              />
              <p>{i > 0 ? `sivu ${i}` : <>&nbsp;</>}</p>
            </div>
          );
        })}
      </div>
      <ComicPageView
        comicName={comicName}
        comic={comic}
        page={page}
        handleClose={() => setOpen(false)}
        open={open}
        handleDecrement={handleDecrement}
        handleIncrement={handleIncrement}
        setKey={setKey}
        stateKey={stateKey}
      />
    </>
  );
};

export default ComicBook;
