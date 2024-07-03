import { Link } from "react-router-dom";

const ComicList = () => {
  return (
    <>
      <Link to={`/comics/1`}>Velhon taloudenhoitaja</Link>
      <p>comic2</p>
      <p>comic3</p>
    </>
  );
};

export default ComicList;
