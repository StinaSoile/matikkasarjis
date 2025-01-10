import {
  Dialog,
  DialogTitle,
  IconButton,
  DialogContent,
  TextField,
  Button,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";

const CreateAccount = ({
  handleClose,
  open,
  handleCreateAccount,
}: {
  handleClose: () => void;
  open: boolean;
  handleCreateAccount: (
    e: React.FormEvent<HTMLFormElement>,
    username: string,
    email: string,
    password: string,
    emailError: boolean,
    passwordError: boolean
  ) => void;
}) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  // TODO:
  // username is already in use, eli reagoi backin erroriin fiksusti
  // password under 8 characters

  useEffect(() => {
    if (password1.length > 0 && password2.length > 0) {
      setPasswordError(password1 !== password2);
    }
  }, [password1, password2]);

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError(true);
    } else setEmailError(false);
  };
  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        Create account
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
        <form
          onSubmit={(e) => {
            handleCreateAccount(
              e,
              username,
              email,
              password1,
              emailError,
              passwordError
            );
          }}
        >
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
            label="Email"
            variant="outlined"
            fullWidth
            name="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (emailError) validateEmail();
            }}
            onBlur={validateEmail}
            required
            error={emailError}
          />
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            name="password"
            type="password"
            value={password1}
            onChange={(e) => {
              setPassword1(e.target.value);
            }}
            required
            error={passwordError}
          />
          <TextField
            label="Confirm password"
            variant="outlined"
            fullWidth
            name="password"
            type="password"
            value={password2}
            onChange={(e) => {
              setPassword2(e.target.value);
            }}
            required
            error={passwordError}
          />
          <Button type="submit" variant="contained" color="primary">
            Create
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateAccount;
