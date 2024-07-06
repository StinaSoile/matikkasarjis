import { Link } from "react-router-dom";
import VelhonTaloudenhoitajaEtusivu from "../../src/assets/VelhonTaloudenhoitaja/s1.png";
import SiivetonLepakkoEtusivu from "../../src/assets/SiivetonLepakko/etusivu.png";

import { Stack } from "@mui/material";

// import ImageList from "@mui/material/ImageList";
// import ImageListItem from "@mui/material/ImageListItem";
// import ImageListItemBar from "@mui/material/ImageListItemBar";

const ComicList = () => {
  return (
    <div className="comiclist-page">
      {/* <ImageList className="image-list">
        <ImageListItem key="Dinon">
          <Link to={`/comics/1`}>
            <img
              src={VelhonTaloudenhoitajaEtusivu}
              alt="Sarjakuvasivu"
              className="comicPage"
              loading="lazy"
            />
          </Link>
          <ImageListItemBar
            title="Velhon taloudenhoitaja"
            subtitle="yläkoulun x:s luokka"
            position="below"
          />
        </ImageListItem>
      </ImageList> */}

      <Stack
        direction="column"
        justifyContent="space-around"
        alignItems="center"
        spacing={2}
      >
        <div className="list-element">
          <Link to={`/comics/1`}>
            <img
              src={VelhonTaloudenhoitajaEtusivu}
              alt="Velhon taloudenhoitaja -sarjakuva"
              className="comicPage"
            />
          </Link>
          <p>Velhon taloudenhoitaja</p>
          <p>Yläkoulun x:s luokka</p>
        </div>
        <div className="list-element">
          <Link to={`/comics/2`}>
            <img
              src={SiivetonLepakkoEtusivu}
              alt="Siivettömän lepakon matka -sarjakuva"
              className="comicPage"
            />
          </Link>
          <p>Siivettömän lepakon matka</p>
          <p>4. luokka</p>
        </div>
        <div className="list-element">comic3</div>
      </Stack>
    </div>
  );
};

export default ComicList;
