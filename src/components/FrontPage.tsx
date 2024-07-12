// import { Stack, Button } from "@mui/material";
import About from "./About";
import CreateAccount from "./CreateAccount";
import Login from "./Login";
import { useState } from "react";
import MenuComponent from "./MenuComponent";

// import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

const FrontPage = () => {
  const [openAbout, setOpenAbout] = useState(false);
  const [openCreateAccount, setOpenCreateAccount] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);

  return (
    <div className="frontPage">
      <MenuComponent
        setOpenAbout={setOpenAbout}
        // setOpenCreateAccount={setOpenCreateAccount}
        // setOpenLogin={setOpenLogin}
      />

      <About handleClose={() => setOpenAbout(false)} open={openAbout} />
      <CreateAccount
        handleClose={() => setOpenCreateAccount(false)}
        open={openCreateAccount}
      />
      <Login handleClose={() => setOpenLogin(false)} open={openLogin} />
      <img
        src="../../Frontpagekokeilu.png"
        alt="Siivetön Lepakko keksipurkilla"
        className="frontpage-picture"
      />
    </div>
  );
};

export default FrontPage;
