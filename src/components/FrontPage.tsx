import About from "./About";
import CreateAccount from "./CreateAccount";
import Login from "./Login";
import { useState } from "react";
import MenuComponent from "./MenuComponent";
import ComicList from "./ComicList";
import { apiBaseUrl } from "../constants";

const FrontPage = () => {
  const [openAbout, setOpenAbout] = useState(false);
  const [openCreateAccount, setOpenCreateAccount] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const imageSrc = `${apiBaseUrl}/images/etusivunkuva.png`;
  return (
    <div className="frontPage">
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
        className="frontpage-picture"
      />
      <ComicList />
    </div>
  );
};

export default FrontPage;
