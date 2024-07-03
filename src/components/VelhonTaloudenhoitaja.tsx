import { useState } from "react";
import { VelhonTaloudenhoitajaPages } from "../data";
// import { Button } from "@mui/material";
import { ArrowForwardIos, ArrowBackIos } from "@mui/icons-material";
import { Stack } from "@mui/material";

const VelhonTaloudenhoitaja = () => {
  const [page, setPage] = useState(1);

  const handleClick = (value: number) => {
    const newPageNumber = page + value;
    if (
      newPageNumber > 0 &&
      newPageNumber <= VelhonTaloudenhoitajaPages.length
    ) {
      setPage(newPageNumber);
    }
  };

  const renderComicPage = () => {
    if (0 < page && page <= VelhonTaloudenhoitajaPages.length) {
      const comicPage = VelhonTaloudenhoitajaPages[page - 1];
      const address = `../../VelhonTaloudenhoitaja/${comicPage}.png`;
      return <img src={address} alt="Sarjakuvasivu" className="comicPage" />;
    }
    return <></>;
  };

  return (
    <div>
      <h1>Velhon taloudenhoitaja</h1>
      {renderComicPage()}
      <Stack
        justifyContent="space-around"
        alignItems="center"
        direction="row"
        spacing={2}
      >
        <ArrowBackIos onClick={() => handleClick(-1)} />
        <p>sivu {page}</p>

        <ArrowForwardIos onClick={() => handleClick(1)} />
      </Stack>
    </div>
  );
};

export default VelhonTaloudenhoitaja;
