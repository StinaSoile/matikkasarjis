import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
// import CloseIcon from "@mui/icons-material/Close";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import "./ComicPage.css";
import { Dialog, Stack } from "@mui/material";

const ComicPage = ({
  list,
  page,
  setPage,
  handleClose,
  open,
  address,
}: {
  list: string[][];
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  handleClose: () => void;
  open: boolean;
  address: string;
}) => {
  //
  const renderComicPage = (
    pageArray: string[][],
    page: number,
    directory: string
  ) => {
    const allPages = pageArray.length;

    if (0 < page && page <= allPages) {
      const comicPage = pageArray[page - 1][0];
      const address = `${directory}${comicPage}`;

      return (
        <img src={address} alt="Sarjakuvasivu" className="comicpage-dialog" />
      );
    }
    return <></>;
  };
  // const addr = `${address}${list[page - 1][0]}`;
  const allPages = list.length;

  const handleClick = (value: number) => {
    const newPageNumber = page + value;
    if (newPageNumber > 0 && newPageNumber <= allPages) {
      setPage(newPageNumber);
    }
  };
  // const handleChange = (
  //   _event: React.ChangeEvent<unknown>,
  //   selected: number
  // ) => {
  //   setPage(selected);
  // };

  if (0 < page && page <= allPages) {
    return (
      <Dialog fullScreen open={open} onClose={handleClose}>
        {/* <div>pikkutestski</div> */}
        <div className="relative">
          <HighlightOffIcon
            onClick={handleClose}
            color="primary"
            className="fixed-top-right"
          />
        </div>

        {renderComicPage(list, page, address)}

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
      </Dialog>
    );
  }
  return <></>;
};
export default ComicPage;
