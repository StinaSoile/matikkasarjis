// import { Grid } from "@mui/material";
import "./ComicPage.css";

import { Link } from "react-router-dom";
// import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useEffect, useState } from "react";
import ComicPage from "./ComicPage";
import { IconButton } from "@mui/material";

const ComicPages = ({
  nameList,
  importList,
}: {
  nameList: string[][];
  importList: {
    [key: string]: string;
  };
}) => {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);
  useEffect(() => {
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
  });

  const renderComicPageModal = (p: number) => {
    setPage(p);
    setOpen(true);
  };

  const handleIncrement = () => {
    const newPageNumber = page + 1;
    if (newPageNumber >= 0 && newPageNumber < nameList.length) {
      setPage(newPageNumber);
    }
  };
  const handleDecrement = () => {
    const newPageNumber = page - 1;
    if (newPageNumber >= 0 && newPageNumber < nameList.length) {
      setPage(newPageNumber);
    }
  };

  const findImageByName = (name: string): string | undefined => {
    return importList[name];
  };

  return (
    <>
      <IconButton style={{ minWidth: "3rem", minHeight: '3rem', zIndex: 1000 }}>
        <Link to="/">
          <ArrowBackIcon
            fontSize="large"
            color="secondary"
            className="fixed-top-left"
          />
        </Link>
      </IconButton>
      <div className="list-container">
        {nameList.map((item, i) => {
          const imageSrc = findImageByName(item[0]);
          let classname = "list-element-for-pages";
          if (page === i) {
            classname = "list-element-for-pages focused";
          }

          return (
            <div
              key={item[0]}
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
      <ComicPage
        list={nameList}
        page={page}
        handleClose={() => setOpen(false)}
        open={open}
        importList={importList}
        handleDecrement={handleDecrement}
        handleIncrement={handleIncrement}
      />
    </>
  );
};

export default ComicPages;
