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
  importList,
  handleDecrement,
  handleIncrement,
}: {
  list: string[][];
  page: number;
  handleClose: () => void;
  open: boolean;
  importList: {
    [key: string]: string;
  };
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

  const findImageByName = (name: string): string | undefined => {
    return importList[name];
  };

  const renderComicPage = (pageArray: string[][], page: number) => {
    const allPages = pageArray.length;

    if (page >= 0 && page < allPages) {
      const comicPage = pageArray[page][0];
      const imageSrc = findImageByName(comicPage);

      return (
        <MobileSwiper onSwipe={handleSwipe}>
          <img
            src={imageSrc}
            alt="Sarjakuvasivu"
            className="comicpage-in-modal shadow"
          />
        </MobileSwiper>
      );
    }
    return <></>;
  };

  if (0 <= page && page <= allPages) {
    return (
      <Dialog
        PaperProps={{
          style: {
            backgroundColor: "black",
            // backgroundColor: "transparent",
          },
        }}
        fullScreen
        open={open}
        onClose={handleClose}
      >
        <div className="relative">
          <CloseIcon
            fontSize="large"
            onClick={handleClose}
            color="primary"
            className="fixed-top-left"
          />
        </div>
        <div className="centered">
          <div>
            <Stack direction="column">
              {renderComicPage(list, page)}

              <Stack
                style={{
                  color: "white",
                  textAlign: "center",
                  fontSize: "200%",
                }}
                alignItems="center"
                direction="row"
                spacing={2}
                justifyContent="center"
              >
                {page > 0 && (
                  <ArrowBackIos
                    style={{ cursor: "pointer" }}
                    onClick={() => handleDecrement()}
                  />
                )}
                {page > 0 && <p>Sivu {page}</p>}

                {page < allPages - 1 && (
                  <ArrowForwardIos
                    style={{ cursor: "pointer" }}
                    onClick={() => handleIncrement()}
                  />
                )}
              </Stack>
            </Stack>
          </div>
        </div>
      </Dialog>
    );
  }
  return <></>;
};
export default ComicPage;
