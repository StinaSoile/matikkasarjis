import About from "./About";
import CreateAccount from "./CreateAccount";
import Login from "./Login";
import { useState } from "react";
import MenuComponent from "./MenuComponent";
import ComicGallery from "./ComicGallery";
import userService from "../../services/userService";

import { apiBaseUrl } from "../../constants";

const HomeScreen = () => {
  const [openAbout, setOpenAbout] = useState(false);
  const [openCreateAccount, setOpenCreateAccount] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const imageSrc = `${apiBaseUrl}/images/etusivunkuva.png`;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = await userService.authenticateUser(username, password);
    console.log(token);
    // token?
  };
  return (
    <div className="homescreen">
      <MenuComponent setOpenAbout={setOpenAbout} setOpenLogin={setOpenLogin} />

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
