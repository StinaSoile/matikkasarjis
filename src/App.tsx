// import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ComicList from "./components/ComicList";
import FrontPage from "./components/FrontPage";
import VelhonTaloudenhoitaja from "./components/VelhonTaloudenhoitaja";
import { Stack } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material";
import { blueGrey, grey } from "@mui/material/colors";
import SiivetonLepakko from "./components/SiivetonLepakko";

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
              <Stack justifyContent="center" alignItems="stretch">
                <FrontPage />
                <ComicList />
              </Stack>
            }
          />
          <Route path="/comics/1" element={<VelhonTaloudenhoitaja />} />
          <Route path="/comics/2" element={<SiivetonLepakko />} />
        </Routes>

        <div>
          <i>Stina Palomäki 2024</i>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
