import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
// import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import "./ComicPage.css";
import { Dialog, Stack } from "@mui/material";
import { useCallback } from "react";
// import { useKeyboardShortcut } from "../keyboardListener";
import MobileSwiper from "./MobileSwiper";

const ComicPage = ({
  list,
  page,
  handleClose,
  open,
  address,
  handleDecrement,
  handleIncrement,
}: {
  list: string[][];
  page: number;
  handleClose: () => void;
  open: boolean;
  address: string;
  handleDecrement: () => void;
  handleIncrement: () => void;
}) => {
  const allPages = list.length;

  const handleSwipe = useCallback(
    ({ deltaX, deltaY }: { deltaX: number; deltaY: number }) => {
      if (Math.abs(deltaX) > 4 && Math.abs(deltaY) > 4) {
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
          if (deltaX > 0) {
            handleDecrement();
          } else {
            handleIncrement();
          }
        } else {
          if (deltaY > 0) {
            handleDecrement();
          } else {
            handleIncrement();
          }
        }
      }
    },
    [handleDecrement, handleIncrement]
  );

  const renderComicPage = (
    pageArray: string[][],
    page: number,
    directory: string
  ) => {
    const allPages = pageArray.length;

    if (page >= 0 && page < allPages) {
      const comicPage = pageArray[page][0];
      const address = `${directory}${comicPage}`;

      return (
        <MobileSwiper onSwipe={handleSwipe}>
          <img src={address} alt="Sarjakuvasivu" className="comicpage-dialog" />
        </MobileSwiper>
      );
    }
    return <></>;
  };

  if (0 <= page && page <= allPages) {
    return (
      <Dialog fullScreen open={open} onClose={handleClose}>
        <div className="relative">
          <CloseIcon
            fontSize="large"
            onClick={handleClose}
            color="primary"
            className="fixed-top-right"
          />
        </div>
        <div className="centered">
          {renderComicPage(list, page, address)}

          <Stack
            justifyContent="space-around"
            alignItems="center"
            direction="row"
            spacing={2}
          >
            <ArrowBackIos onClick={() => handleDecrement()} />
            {page > 0 && <p>Sivu {page}</p>}

            <ArrowForwardIos onClick={() => handleIncrement()} />
          </Stack>
        </div>
      </Dialog>
    );
  }
  return <></>;
};
export default ComicPage;
