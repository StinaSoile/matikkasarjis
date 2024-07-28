import About from "./About";
import CreateAccount from "./CreateAccount";
import Login from "./Login";
import { useState } from "react";
import MenuComponent from "./MenuComponent";
import ComicGallery from "./ComicGallery";
import { apiBaseUrl } from "../constants";

const HomeScreen = () => {
  const [openAbout, setOpenAbout] = useState(false);
  const [openCreateAccount, setOpenCreateAccount] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const imageSrc = `${apiBaseUrl}/images/etusivunkuva.png`;
  return (
    <div className="homescreen">
      <MenuComponent setOpenAbout={setOpenAbout} />

      <About handleClose={() => setOpenAbout(false)} open={openAbout} />
      <CreateAccount
        handleClose={() => setOpenCreateAccount(false)}
        open={openCreateAccount}
      />
      <Login handleClose={() => setOpenLogin(false)} open={openLogin} />
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
