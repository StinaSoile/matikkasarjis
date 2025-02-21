import About from "./About/About";
import CreateAccount from "./CreateAccount/CreateAccount";
import Login from "./Login/Login";
import { useState } from "react";
import Navbar from "./Navbar/Navbar";
import ComicGallery from "./ComicGallery/ComicGallery";
import userService from "../../services/userService";

import { apiBaseUrl } from "../../constants";

const HomeScreen = ({
  isLoggedIn,
  setIsLoggedIn,
}: {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [openAbout, setOpenAbout] = useState(false);
  const [openCreateAccount, setOpenCreateAccount] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const imageSrc = `${apiBaseUrl}/images/etusivunkuva.png`;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [newUsername, setNewUsername] = useState("");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [confirmError, setConfirmError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [duplicateNameError, setDuplicateNameError] = useState(false);

  const handleCreateAccount = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (emailError || confirmError || nameError || passwordError) {
      return;
    }
    try {
      await userService.createUser(newUsername, email, newPassword);
      login(newUsername, newPassword);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === "Request failed with status code 409") {
          setDuplicateNameError(true);
        } else {
          console.error("Unexpected error: ", error.message);
        }
      }
    }
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login(username, password);
  };

  const login = async (username: string, password: string) => {
    const data = await userService.authenticateUser(username, password);
    window.localStorage.setItem("username", data.username);
    window.localStorage.setItem("progress", JSON.stringify(data.progress));
    window.localStorage.setItem("token", data.token);

    setUsername("");
    setPassword("");
    setIsLoggedIn(true);
    setOpenLogin(false);
    setOpenCreateAccount(false);
    setNewUsername("");
    setEmail("");
    setNewPassword("");
    setConfirmPassword("");
  };
  return (
    <div className="homescreen">
      <Navbar
        setOpenAbout={setOpenAbout}
        setOpenLogin={setOpenLogin}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        setOpenCreateAccount={setOpenCreateAccount}
      />

      <About handleClose={() => setOpenAbout(false)} open={openAbout} />
      <CreateAccount
        handleClose={() => setOpenCreateAccount(false)}
        open={openCreateAccount}
        handleCreateAccount={handleCreateAccount}
        newUsername={newUsername}
        setNewUsername={setNewUsername}
        email={email}
        setEmail={setEmail}
        newPassword={newPassword}
        setNewPassword={setNewPassword}
        confirmPassword={confirmPassword}
        setConfirmPassword={setConfirmPassword}
        emailError={emailError}
        setEmailError={setEmailError}
        confirmError={confirmError}
        setConfirmError={setConfirmError}
        passwordError={passwordError}
        setPasswordError={setPasswordError}
        nameError={nameError}
        setNameError={setNameError}
        duplicateNameError={duplicateNameError}
        setDuplicateNameError={setDuplicateNameError}
      />
      <Login
        handleClose={() => setOpenLogin(false)}
        open={openLogin}
        handleLogin={handleLogin}
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
      />
      <img
        src={imageSrc}
        alt="Siivetön Lepakko keksipurkilla"
        className="homescreen-picture"
      />
      <ComicGallery />
    </div>
  );
};

export default HomeScreen;
