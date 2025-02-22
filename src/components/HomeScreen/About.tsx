import {
  Dialog,
  DialogTitle,
  IconButton,
  DialogContent,
  Typography,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";

const About = ({
  handleClose,
  open,
}: {
  handleClose: () => void;
  open: boolean;
}) => {
  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        About author
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon fontSize="large" />
      </IconButton>
      <DialogContent dividers>
        <Typography gutterBottom>
          Stina Palomäki on matikan ja fysiikan opettajaksi valmistunut
          introvertti joka pelkää lapsia, ja siksi hän tekee mieluummin
          matikkasarjakuvia yhdistäen taideharrastuksensa matematiikkaan kuin
          opettaa yläkoulussa. Näin hän luo illuusion että hänen osaamisellaan
          olisi jotakin väliä yhteiskunnalle ja koulutukselle ja kaikelle,
          vaikka todellisuudessa hän vain opettelee koodailemaan jotta voisi
          vaihtaa alaa.
        </Typography>
      </DialogContent>
    </Dialog>
  );
};

export default About;
