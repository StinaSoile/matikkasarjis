import { Stack } from "@mui/material";

import { Link } from "react-router-dom";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { useState } from "react";
import ComicPage from "./ComicPage";

const ComicPages = ({
  list,
  address,
}: {
  list: string[][];
  address: string;
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [page, setPage] = useState(1);

  // from address
  // return all images according to list
  // and to every image
  // tie a link to picture
  // but later picture needs to have other elements outside of it, that depend of a pic!
  // eli data on: string[][]
  /* [
    ["address.s1.png", "question1", "answer1"], ["address.s2.png", "question2" ,"answer"]
    ]
*/
  const renderComicPageModal = (page: number) => {
    setPage(page);
    setOpen(true);
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
          <HighlightOffIcon color="primary" className="fixed-top-right" />
        </Link>
        {list.map((item, i) => {
          const addr = `${address}${item[0]}`;
          // console.log(addr);
          return (
            <div key={item[0]} className="list-element">
              <img
                src={addr}
                alt="sarjakuvasivu"
                className="comicPage"
                onClick={() => renderComicPageModal(i + 1)}
              />
            </div>
          );
        })}
      </Stack>
      <ComicPage
        list={list}
        page={page}
        setPage={setPage}
        handleClose={() => setOpen(false)}
        open={open}
        address={address}
      />
    </>
  );
};

export default ComicPages;
