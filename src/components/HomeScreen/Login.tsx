import {
  Dialog,
  DialogTitle,
  IconButton,
  DialogContent,
  TextField,
  Button,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";

const Login = ({
  handleClose,
  open,
  handleLogin,
  username,
  setUsername,
  password,
  setPassword,
}: {
  handleClose: () => void;
  open: boolean;
  handleLogin: (e: React.FormEvent<HTMLFormElement>) => void;
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
}) => {
  // tee:
  // form jossa username ja salasana
  // sen jlk formille toiminnallisuus että se lähettää ne backiin
  // sen jlk minne backista tullut token tallentuu?
  // sen jlk ehkä etusivulle ominaisuus että tulostaa vaikka jonkun "jee olet kirjautunut käyttäjänä X!"
  // sen jlk logout joka nollaa tokenin kuten fullstack osa4 meille opettaapi
  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        Sign in
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
        <form onSubmit={handleLogin}>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit" variant="contained" color="primary">
            Sign Up
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Login;
