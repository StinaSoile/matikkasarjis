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

  // TODO:
  // kai nuo statehommat pitäisi kuitenkin siirtää tänne ylemmäs jotta voin tyhjätä ne.
  // sen jälkeen voin miettiä sitä miten pääsi eroon tästä jatkuvasta propseilusta
  const handleCreateAccount = async (
    e: React.FormEvent<HTMLFormElement>,
    username: string,
    email: string,
    password: string,
    emailError: boolean,
    passwordError: boolean
  ) => {
    e.preventDefault();
    if (!emailError && !passwordError) {
      const data = await userService.createUser(username, email, password);
      console.log(data);
      login(username, password);
    }
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login(username, password);
  };

  const login = async (username: string, password: string) => {
    const data = await userService.authenticateUser(username, password);
    console.log(data); // {token, username, progress}
    window.localStorage.setItem("username", data.username);
    window.localStorage.setItem("progress", JSON.stringify(data.progress));
    window.localStorage.setItem("token", data.token);

    setUsername("");
    setPassword("");
    setIsLoggedIn(true);
    setOpenLogin(false);
    setOpenCreateAccount(false);
  };
  return (
    <div className="homescreen">
      <MenuComponent
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
