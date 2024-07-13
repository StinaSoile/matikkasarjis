import { useNavigate } from "react-router-dom";
import VelhonTaloudenhoitajaEtusivu from "../../src/assets/VelhonTaloudenhoitaja/velhontaloudenhoitaja-etusivu.png";
import SiivetonLepakkoEtusivu from "../../src/assets/SiivetonLepakko/varsinainen-etusivu.png";
import "./ComicPage.css";

const ComicList = () => {
  const navigate = useNavigate();
  return (
    <div className="list-container center">

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
          <div>Yläkoulun 8. luokka</div>
        </div>
      </div>
    </div>
  );
};

export default ComicList;
