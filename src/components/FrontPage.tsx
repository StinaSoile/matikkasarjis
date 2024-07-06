import { Stack, Button } from "@mui/material";
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
      <MenuComponent />
      <Stack
        direction="row"
        spacing={2}
        justifyContent="space-around"
        alignItems="center"
      >
        <Stack>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setOpenCreateAccount(true)}
          >
            Create account
          </Button>
          <Button variant="contained" onClick={() => setOpenLogin(true)}>
            Sign in
          </Button>
        </Stack>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setOpenAbout(true)}
        >
          About author
        </Button>
      </Stack>
      <About handleClose={() => setOpenAbout(false)} open={openAbout} />
      <CreateAccount
        handleClose={() => setOpenCreateAccount(false)}
        open={openCreateAccount}
      />
      <Login handleClose={() => setOpenLogin(false)} open={openLogin} />
      <img
        src="../../Frontpagekokeilu.png"
        alt="Kuva lepakosta jolla on viitta"
        className="normalPicture"
      />
      {/* <Typography variant="h3">SARJIKSET</Typography> */}
    </div>
  );
};

export default FrontPage;
