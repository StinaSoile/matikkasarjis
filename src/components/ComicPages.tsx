// import { Grid } from "@mui/material";
import "./ComicPage.css";

import { Link } from "react-router-dom";
// import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useEffect, useState } from "react";
import ComicPage from "./ComicPage";
import { IconButton } from "@mui/material";

const ComicPages = ({
  list,
  address,
}: {
  list: string[][];
  address: string;
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
    if (newPageNumber >= 0 && newPageNumber < list.length) {
      setPage(newPageNumber);
    }
  };
  const handleDecrement = () => {
    const newPageNumber = page - 1;
    if (newPageNumber >= 0 && newPageNumber < list.length) {
      setPage(newPageNumber);
    }
  };

  return (
    <>
      <div className="list-container">
        <IconButton style={{ minWidth: "3rem" }}>
          <Link to="/">
            <ArrowBackIcon
              fontSize="large"
              color="secondary"
              className="fixed-top-left"
            />
          </Link>
        </IconButton>
        {list.map((item, i) => {
          const addr = `${address}${item[0]}`;
          let classname = "list-element-for-pages";
          if (page === i) {
            classname = "list-element-for-pages focused";
          }

          // console.log(addr);
          return (
            <div
              key={item[0]}
              id={i.toString()}
              className={classname}
              onClick={() => renderComicPageModal(i)}
            >
              <img
                src={addr}
                alt="sarjakuvasivu"
                className="comic-page-in-list"
              />
              {i > 0 && <p>sivu {i}</p>}
            </div>
          );
        })}
      </div>
      <ComicPage
        list={list}
        page={page}
        handleClose={() => setOpen(false)}
        open={open}
        address={address}
        handleDecrement={handleDecrement}
        handleIncrement={handleIncrement}
      />
    </>
  );
};

export default ComicPages;
