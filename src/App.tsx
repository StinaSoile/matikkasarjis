// import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import ComicList from "./components/ComicList";
import FrontPage from "./components/FrontPage";
import VelhonTaloudenhoitaja from "./components/VelhonTaloudenhoitaja";
import { Stack } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material";
import { blueGrey, grey } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: grey,
    secondary: blueGrey,
  },
  typography: {},
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="stretch"
                spacing={4}
              >
                <FrontPage />
                <ComicList />
              </Stack>
            }
          />
          <Route path="/comics/1" element={<VelhonTaloudenhoitaja />} />
        </Routes>

        <div>
          <i>Stina Palomäki 2024</i>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
