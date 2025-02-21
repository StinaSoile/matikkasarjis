import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import MoreIcon from "@mui/icons-material/MoreVert";
import Face4Icon from "@mui/icons-material/Face4";
import LoginIcon from "@mui/icons-material/Login";

export default function Navbar({
  setOpenAbout,
  setOpenLogin,
  isLoggedIn,
  setIsLoggedIn,
  setOpenCreateAccount,
}: {
  setOpenAbout: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenLogin: React.Dispatch<React.SetStateAction<boolean>>;
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenCreateAccount: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleOpenAbout = () => {
    setOpenAbout(true);
    setMobileMoreAnchorEl(null);
  };

  const handleOpenLogin = () => {
    setOpenLogin(true);
    setMobileMoreAnchorEl(null);
  };

  const handleLogout = () => {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("username");
    window.localStorage.removeItem("progress");
    setIsLoggedIn(false);
    setMobileMoreAnchorEl(null);
  };

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
      PaperProps={{
        sx: {
          bgcolor: "background.paper",
          color: "text.primary",
        },
      }}
    >
      {isLoggedIn ? (
        <MenuItem onClick={handleLogout}>
          <IconButton size="large" aria-label="logout-small" color="error">
            <LoginIcon />
          </IconButton>
          <p>Kirjaudu ulos</p>
        </MenuItem>
      ) : (
        [
          <MenuItem key="menuitem01" onClick={handleOpenLogin}>
            <IconButton size="large" aria-label="login-small" color="success">
              <LoginIcon />
            </IconButton>
            <p>Kirjaudu</p>
          </MenuItem>,
          <MenuItem key="menuitem02" onClick={() => setOpenCreateAccount(true)}>
            <IconButton size="large" aria-label="create-account" color="info">
              <PersonAddIcon />
            </IconButton>
            <p>Luo tunnus</p>
          </MenuItem>,
        ]
      )}
      <MenuItem onClick={handleOpenAbout}>
        <IconButton
          size="large"
          aria-label="about-author-small"
          color="secondary"
        >
          <Face4Icon />
        </IconButton>
        <p>About author</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{
          bgcolor: "grey.900",
          color: "common.white",
        }}
      >
        <Toolbar>
          <Box sx={{ flexGrow: 1 }} />
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              "& .MuiMenuItem-root": {
                color: "common.white",
              },
            }}
          >
            <MenuItem onClick={() => setOpenAbout(true)}>
              <IconButton
                size="large"
                aria-label="about-author-big"
                color="secondary"
              >
                <Face4Icon />
              </IconButton>
              <p>Tekijästä</p>
            </MenuItem>

            {isLoggedIn ? (
              <MenuItem onClick={handleLogout}>
                <IconButton size="large" aria-label="logout-big" color="error">
                  <LoginIcon />
                </IconButton>
                <p>Kirjaudu ulos</p>
              </MenuItem>
            ) : (
              [
                <MenuItem
                  key="menuitem1"
                  onClick={() => setOpenCreateAccount(true)}
                >
                  <IconButton
                    size="large"
                    aria-label="create-account"
                    color="info"
                  >
                    <PersonAddIcon />
                  </IconButton>
                  <p>Luo tunnus</p>
                </MenuItem>,
                <MenuItem key="menuitem2" onClick={() => setOpenLogin(true)}>
                  <IconButton
                    size="large"
                    aria-label="login-big"
                    color="success"
                  >
                    <LoginIcon />
                  </IconButton>
                  <p>Kirjaudu</p>
                </MenuItem>,
              ]
            )}
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              sx={{ color: "common.white" }}
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </Box>
  );
}
