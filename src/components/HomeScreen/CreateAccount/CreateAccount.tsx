import {
  Dialog,
  DialogTitle,
  IconButton,
  DialogContent,
  TextField,
  Button,
  Alert,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import { useEffect, Dispatch, SetStateAction } from "react";

const CreateAccount = ({
  handleClose,
  open,
  handleCreateAccount,
  newUsername,
  setNewUsername,
  email,
  setEmail,
  newPassword,
  setNewPassword,
  confirmPassword,
  setConfirmPassword,
  emailError,
  setEmailError,
  confirmError,
  setConfirmError,
  passwordError,
  setPasswordError,
  nameError,
  setNameError,
  duplicateNameError,
  setDuplicateNameError,
}: {
  handleClose: () => void;
  open: boolean;
  handleCreateAccount: (e: React.FormEvent<HTMLFormElement>) => void;
  newUsername: string;
  setNewUsername: Dispatch<SetStateAction<string>>;
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  newPassword: string;
  setNewPassword: Dispatch<SetStateAction<string>>;
  confirmPassword: string;
  setConfirmPassword: Dispatch<SetStateAction<string>>;
  emailError: boolean;
  setEmailError: Dispatch<SetStateAction<boolean>>;
  confirmError: boolean;
  setConfirmError: Dispatch<SetStateAction<boolean>>;
  passwordError: boolean;
  setPasswordError: Dispatch<SetStateAction<boolean>>;
  nameError: boolean;
  setNameError: Dispatch<SetStateAction<boolean>>;
  duplicateNameError: boolean;
  setDuplicateNameError: Dispatch<SetStateAction<boolean>>;
}) => {
  useEffect(() => {
    if (newPassword.length > 0 && confirmPassword.length > 0) {
      setConfirmError(newPassword !== confirmPassword);
    }
  }, [newPassword, confirmPassword]);

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError(true);
    } else setEmailError(false);
  };

  const validatePassword = () => {
    if (newPassword.length < 8) {
      setPasswordError(true);
    } else setPasswordError(false);
  };

  const validateName = () => {
    setDuplicateNameError(false);
    if (newUsername.length < 1) setNameError(true);
    else setNameError(false);
  };

  const isErrors = () => {
    return (
      nameError ||
      emailError ||
      passwordError ||
      confirmError ||
      duplicateNameError
    );
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
            handleCreateAccount(e);
          }}
        >
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            name="username"
            value={newUsername}
            onChange={(e) => {
              setNewUsername(e.target.value);
              if (nameError) validateName();
            }}
            required
            onBlur={validateName}
            error={nameError}
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
            value={newPassword}
            onChange={(e) => {
              setNewPassword(e.target.value);
              if (passwordError) validatePassword();
            }}
            required
            onBlur={validatePassword}
            error={passwordError}
          />
          <TextField
            label="Confirm password"
            variant="outlined"
            fullWidth
            name="password"
            type="password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
            required
            error={confirmError}
          />
          {isErrors() ? (
            <Alert variant="outlined" severity="warning">
              {duplicateNameError && <>Nimi on jo käytössä. </>}
              {nameError && <>Anna käyttäjänimi. </>}
              {emailError && <>Sähköposti on virheellinen. </>}
              {passwordError && (
                <>Salasanan tulee olla vähintään 8 merkkiä pitkä. </>
              )}
              {confirmError && (
                <>Varmistussalasana ja salasana eivät ole samat. </>
              )}
            </Alert>
          ) : (
            <></>
          )}
          <Button type="submit" variant="contained" color="primary">
            Create
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateAccount;
