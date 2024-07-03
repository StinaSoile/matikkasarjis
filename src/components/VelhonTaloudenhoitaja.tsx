import { useState } from "react";
import { VelhonTaloudenhoitajaPages } from "../data";

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
    <>
      <h1>Velhon taloudenhoitaja</h1>
      {renderComicPage()}
      <p>sivu {page}</p>
      <button onClick={() => handleClick(-1)}>Edellinen</button>
      <button onClick={() => handleClick(1)}>Seuraava</button>
    </>
  );
};

export default VelhonTaloudenhoitaja;
