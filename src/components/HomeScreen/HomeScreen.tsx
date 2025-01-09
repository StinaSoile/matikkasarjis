import About from "./About";
import CreateAccount from "./CreateAccount";
import Login from "./Login";
import { useState } from "react";
import MenuComponent from "./MenuComponent";
import ComicGallery from "./ComicGallery";
import userService from "../../services/userService";

import { apiBaseUrl } from "../../constants";

const HomeScreen = ({
  isLoggedIn,
  setIsLoggedIn,
}: // setOpenCreateAccount,
{
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [openAbout, setOpenAbout] = useState(false);
  const [openCreateAccount, setOpenCreateAccount] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const imageSrc = `${apiBaseUrl}/images/etusivunkuva.png`;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = await userService.authenticateUser(username, password);
    console.log(data); // {token, username, progress}
    window.localStorage.setItem("username", data.username);
    window.localStorage.setItem("progress", data.progress);
    window.localStorage.setItem("token", data.token);

    setUsername("");
    setPassword("");
    setIsLoggedIn(true);
    setOpenLogin(false);
  };
  return (
    <div className="homescreen">
      <MenuComponent
        setOpenAbout={setOpenAbout}
        setOpenLogin={setOpenLogin}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
      />

      <About handleClose={() => setOpenAbout(false)} open={openAbout} />
      <CreateAccount
        handleClose={() => setOpenCreateAccount(false)}
        open={openCreateAccount}
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
