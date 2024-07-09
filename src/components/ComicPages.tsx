import { Stack } from "@mui/material";
import "./ComicPage.css";

import { Link } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";

import { useEffect, useState } from "react";
import ComicPage from "./ComicPage";

const ComicPages = ({
  list,
  address,
}: {
  list: string[][];
  address: string;
}) => {
  const [open, setOpen] = useState<boolean>(false);
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
      <Stack
        direction="column"
        justifyContent="space-around"
        alignItems="center"
        spacing={2}
      >
        <Link to="/">
          <CloseIcon
            fontSize="large"
            color="primary"
            className="fixed-top-right"
          />
        </Link>
        {list.map((item, i) => {
          const addr = `${address}${item[0]}`;
          let classname = "list-element";
          if (page === i) {
            classname = "focused-list-element";
          }
          // console.log(addr);
          return (
            <div key={item[0]} id={i.toString()} className={classname}>
              <img
                src={addr}
                alt="sarjakuvasivu"
                className="comicPage"
                onClick={() => renderComicPageModal(i)}
              />
              {i > 0 && <p>sivu {i}</p>}
            </div>
          );
        })}
      </Stack>
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
