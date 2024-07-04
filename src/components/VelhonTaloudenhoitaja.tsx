import { useState } from "react";
import { VelhonTaloudenhoitajaPages } from "../data";
import { ArrowForwardIos, ArrowBackIos } from "@mui/icons-material";
import { Button, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import Pagination from "@mui/material/Pagination";

const VelhonTaloudenhoitaja = () => {
  const [page, setPage] = useState(1);
  const allPages = VelhonTaloudenhoitajaPages.length;
  function PaginationOutlined() {
    return (
      <Stack spacing={2}>
        <Pagination count={10} variant="outlined" color="primary" />
        <Pagination count={10} variant="outlined" color="secondary" />
        <Pagination count={10} variant="outlined" disabled />
      </Stack>
    );
  }

  const handleClick = (value: number) => {
    const newPageNumber = page + value;
    if (newPageNumber > 0 && newPageNumber <= allPages) {
      setPage(newPageNumber);
    }
  };

  const handleChange = (
    event: React.ChangeEvent<unknown>,
    selected: number
  ) => {
    setPage(selected);
  };

  const renderComicPage = () => {
    if (0 < page && page <= allPages) {
      const comicPage = VelhonTaloudenhoitajaPages[page - 1];
      const address = `../../VelhonTaloudenhoitaja/${comicPage}.png`;
      return <img src={address} alt="Sarjakuvasivu" className="comicPage" />;
    }
    return <></>;
  };

  return (
    <div className="comicBackground">
      <Link to="/">
        <Button variant="contained">Home</Button>
      </Link>
      <h1>Velhon taloudenhoitaja</h1>
      {renderComicPage()}
      <Pagination count={allPages} page={page} onChange={handleChange} />

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
    </div>
  );
};

export default VelhonTaloudenhoitaja;
