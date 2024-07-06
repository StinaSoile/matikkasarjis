import { useState } from "react";
import { SiivetonLepakkoPages } from "../data";
import { Stack } from "@mui/material";
import { Link } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { renderComicPage } from "../comicPageHelpers";

const SiivetonLepakko = () => {
  const [page, setPage] = useState(1);
  const allPages = SiivetonLepakkoPages.length;
  const directory = `../../src/assets/SiivetonLepakko/`;
  // const handleClick = (value: number) => {
  //   const newPageNumber = page + value;
  //   if (newPageNumber > 0 && newPageNumber <= allPages) {
  //     setPage(newPageNumber);
  //   }
  // };

  const handleChange = (
    _event: React.ChangeEvent<unknown>,
    selected: number
  ) => {
    setPage(selected);
  };

  return (
    <div className="comicBackground">
      <div className="relative">
        <Link to="/">
          <HighlightOffIcon color="primary" className="top-right" />
        </Link>
      </div>
      <Stack alignItems="center" spacing={3}>
        <h1 className="top-and-bottom">Siivettömän lepakon matka</h1>
        {renderComicPage(SiivetonLepakkoPages, page, directory)}
        <Pagination
          className="top-and-bottom"
          count={allPages}
          siblingCount={1}
          boundaryCount={1}
          color="primary"
          page={page}
          onChange={handleChange}
        />

        {/* <Stack
        justifyContent="space-around"
        alignItems="center"
        direction="row"
        spacing={2}
      >
        <ArrowBackIos onClick={() => handleClick(-1)} />
        <p>sivu {page}</p>

        <ArrowForwardIos onClick={() => handleClick(1)} />
      </Stack> */}
      </Stack>
    </div>
  );
};

export default SiivetonLepakko;
