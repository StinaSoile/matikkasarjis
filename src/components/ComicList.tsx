import { Link } from "react-router-dom";

const ComicList = () => {
  return (
    <div className="comicBackground">
      <p>
        <Link to={`/comics/1`}>Velhon taloudenhoitaja</Link>
      </p>
      <p>comic2</p>
      <p>comic3</p>
    </div>
  );
};

export default ComicList;
