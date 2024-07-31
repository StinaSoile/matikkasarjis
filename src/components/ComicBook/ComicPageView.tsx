import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import "./ComicPage.css";
import { Dialog, Stack } from "@mui/material";
import { useCallback } from "react";
import MobileSwiper from "./MobileSwiper";
import { Page } from "../../types";
import { apiBaseUrl } from "../../constants";
import MathQuestions from "./MathQuestions";

const ComicPageView = ({
  comicName,
  comic,
  page,
  handleClose,
  open,
  handleDecrement,
  handleIncrement,
  setKey,
}: {
  comicName: string;
  comic: Page[];
  page: number;
  handleClose: () => void;
  open: boolean;
  handleDecrement: () => void;
  handleIncrement: () => void;
  setKey: React.Dispatch<React.SetStateAction<string | undefined>>;
}) => {
  const allPages = comic.length;

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

  const renderComicPage = (pageArray: Page[], page: number) => {
    const allPages = pageArray.length;

    if (page >= 0 && page < allPages) {
      const comicPage = pageArray[page].pictureName;
      const imageSrc = `${apiBaseUrl}/images/${comicName}/${comicPage}`;

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
              {renderComicPage(comic, page)}

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
              <MathQuestions
                setKey={setKey}
                comicName={comicName}
                page={page}
                comic={comic}
              />
            </Stack>
          </div>
        </div>
      </Dialog>
    );
  }
  return <></>;
};
export default ComicPageView;
