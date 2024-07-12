import { useNavigate } from "react-router-dom";
import VelhonTaloudenhoitajaEtusivu from "../../src/assets/VelhonTaloudenhoitaja/velhontaloudenhoitaja-etusivu.png";
import SiivetonLepakkoEtusivu from "../../src/assets/SiivetonLepakko/varsinainen-etusivu.png";
import "./ComicPage.css";

// import { Grid } from "@mui/material";

// import ImageList from "@mui/material/ImageList";
// import ImageListItem from "@mui/material/ImageListItem";
// import ImageListItemBar from "@mui/material/ImageListItemBar";

const ComicList = () => {
  const navigate = useNavigate();
  return (
    <div className="list-container center">
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

      <div
        className="list-element-made-by-sergei"
        onClick={() => navigate(`/comics/siivetonlepakko`)}
      >
        <img
          src={SiivetonLepakkoEtusivu}
          alt="Siivettömän lepakon matka -sarjakuva"
          className="comic-page-in-list shadow"
        />
        <div className="div-in-comiclist">
          <p>Siivettömän lepakon matka</p>
          <p>4. luokka</p>
        </div>
      </div>

      <div
        className="list-element-made-by-sergei"
        onClick={() => navigate("/comics/velhontaloudenhoitaja")}
      >
        <img
          src={VelhonTaloudenhoitajaEtusivu}
          alt="Velhon taloudenhoitaja -sarjakuva"
          className="comic-page-in-list shadow"
        />
        <div className="div-in-comiclist">
          <div>Velhon taloudenhoitaja</div>
          <div>Yläkoulun x:s luokka</div>
        </div>
      </div>
    </div>
  );
};

export default ComicList;
