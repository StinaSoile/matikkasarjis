import * as React from "react";
// import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
// import Typography from "@mui/material/Typography";
// import InputBase from "@mui/material/InputBase";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
// import SearchIcon from "@mui/icons-material/Search";
// import PersonAddIcon from "@mui/icons-material/PersonAdd";
import MoreIcon from "@mui/icons-material/MoreVert";
import Face4Icon from "@mui/icons-material/Face4";
// import LoginIcon from "@mui/icons-material/Login";

// const Search = styled("div")(({ theme }) => ({
//   position: "relative",
//   borderRadius: theme.shape.borderRadius,
//   backgroundColor: alpha(theme.palette.common.white, 0.15),
//   "&:hover": {
//     backgroundColor: alpha(theme.palette.common.white, 0.25),
//   },
//   marginRight: theme.spacing(2),
//   marginLeft: 0,
//   width: "100%",
//   [theme.breakpoints.up("sm")]: {
//     marginLeft: theme.spacing(3),
//     width: "auto",
//   },
// }));

// const SearchIconWrapper = styled("div")(({ theme }) => ({
//   padding: theme.spacing(0, 2),
//   height: "100%",
//   position: "absolute",
//   pointerEvents: "none",
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
// }));

// const StyledInputBase = styled(InputBase)(({ theme }) => ({
//   color: "inherit",
//   "& .MuiInputBase-input": {
//     padding: theme.spacing(1, 1, 1, 0),
//     // vertical padding + font size from searchIcon
//     paddingLeft: `calc(1em + ${theme.spacing(4)})`,
//     transition: theme.transitions.create("width"),
//     width: "100%",
//     [theme.breakpoints.up("md")]: {
//       width: "20ch",
//     },
//   },
// }));

export default function MenuComponent({
  setOpenAbout,
}: // setOpenCreateAccount,
// setOpenLogin,
{
  setOpenAbout: React.Dispatch<React.SetStateAction<boolean>>;
  // setOpenCreateAccount: React.Dispatch<React.SetStateAction<boolean>>;
  // setOpenLogin: React.Dispatch<React.SetStateAction<boolean>>;
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
    >
      {/* <MenuItem onClick={() => setOpenLogin(true)}>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <LoginIcon />
        </IconButton>
        <p>Sign in</p>
      </MenuItem>
      <MenuItem onClick={() => setOpenCreateAccount(true)}>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <PersonAddIcon />
        </IconButton>
        <p>Create account</p>
      </MenuItem> */}
      <MenuItem onClick={handleOpenAbout}>
        <IconButton
          size="large"
          aria-label="about-author-small"
          color="inherit"
        >
          <Face4Icon />
        </IconButton>
        <p>About author</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar color="primary" position="fixed">
        <Toolbar>
          {/* <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            MUI
          </Typography> */}
          {/* <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search comics"
              inputProps={{ "aria-label": "search" }}
            />
          </Search> */}
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {/* <MenuItem onClick={() => setOpenLogin(true)}>
              <IconButton
                size="large"
                aria-label="show 4 new mails"
                color="inherit"
              >
                <LoginIcon />
              </IconButton>
              <p>Sign in</p>
            </MenuItem>
            <MenuItem onClick={() => setOpenCreateAccount(true)}>
              <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"
              >
                <PersonAddIcon />
              </IconButton>
              <p>Create account</p>
            </MenuItem> */}
            <MenuItem onClick={() => setOpenAbout(true)}>
              <IconButton
                size="large"
                aria-label="about-author-big"
                color="inherit"
              >
                <Face4Icon />
              </IconButton>
              <p>About author</p>
            </MenuItem>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
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
