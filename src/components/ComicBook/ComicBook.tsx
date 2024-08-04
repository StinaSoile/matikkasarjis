import "./ComicPage.css";

import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useEffect, useRef, useState } from "react";
import ComicPageView from "./ComicPageView";
import { IconButton } from "@mui/material";
import comicService from "../../services/comicService";
import { Page } from "../../types";
import { apiBaseUrl } from "../../constants";
import axios from "axios";

const ComicBook = ({ comicName }: { comicName: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const selectedImageRef = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [comic, setComic] = useState<Page[]>([]);
  const [stateKey, setKey] = useState<string | undefined>(undefined);
  useEffect(() => {
    const keyFromStorage = getKeyFromLocalStorage();
    const getPages = async (comicName: string, key: string | undefined) => {
      // tämä pois useEffectist?
      try {
        const data = await comicService.getPages(comicName, key);
        setComic(data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log(error.status);
          console.log(error.response);
        } else {
          console.error(error);
        }
      }
    };
    getPages(comicName, keyFromStorage);

    const element = document.getElementById(page.toString());
    element?.scrollIntoView({ block: "center" });

    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, stateKey]);

  const keyDownHandler = (e: globalThis.KeyboardEvent) => {
    let maxElementsOnRow = 1;
    if (containerRef.current && selectedImageRef.current) {
      maxElementsOnRow = Math.floor(
        containerRef.current.offsetWidth / selectedImageRef.current?.offsetWidth
      );
    }

    switch (e.key) {
      case "ArrowUp":
        handleDecrement(maxElementsOnRow);
        break;
      case "ArrowDown":
        handleIncrement(maxElementsOnRow);
        break;
      case "ArrowRight":
        handleIncrement();
        break;
      case "ArrowLeft":
        handleDecrement();
        break;
      case "Enter":
        renderComicPageModal(page);
        break;
    }
  };

  const renderComicPageModal = (p: number) => {
    setPage(p);
    setOpen(true);
  };

  const handleIncrement = (num = 1) => {
    const newPageNumber = page + num;
    if (newPageNumber >= 0 && newPageNumber < comic.length) {
      setPage(newPageNumber);
    }
  };
  const handleDecrement = (num = 1) => {
    const newPageNumber = page - num;
    if (newPageNumber >= 0 && newPageNumber < comic.length) {
      setPage(newPageNumber);
    }
  };

  const getKeyFromLocalStorage = () => {
    const newKey = window.localStorage.getItem(comicName);
    if (newKey) {
      setKey(newKey);
      return newKey;
    }
    return undefined;
  };

  const changeKey = (key: string) => {
    setKey(key);
    window.localStorage.setItem(comicName, key);
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
      <div className="list-container" ref={containerRef}>
        {comic.map((item, i) => {
          const imageSrc = `${apiBaseUrl}/images/${comicName}/${item.pictureName}`;
          const classname = `list-element-for-pages ${
            page === i ? "focused" : ""
          }`;
          return (
            <div
              ref={page === i ? selectedImageRef : null}
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
        changeKey={changeKey}
        stateKey={stateKey}
      />
    </>
  );
};

export default ComicBook;
