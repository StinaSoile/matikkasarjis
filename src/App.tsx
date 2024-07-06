// import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ComicList from "./components/ComicList";
import FrontPage from "./components/FrontPage";
import VelhonTaloudenhoitajaOnePage from "./components/VelhonTaloudenhoitajaOnePage";
import { Stack } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material";
import { blueGrey, grey } from "@mui/material/colors";
import SiivetonLepakko from "./components/SiivetonLepakko";
import ComicPages from "./components/ComicPages";
import { VelhonTaloudenhoitajaPagesWithQuestions } from "./comicData";

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
          <Route path="/comics/1" element={<VelhonTaloudenhoitajaOnePage />} />
          <Route path="/comics/2" element={<SiivetonLepakko />} />
          <Route
            path="/comics/3"
            element={
              <ComicPages
                list={VelhonTaloudenhoitajaPagesWithQuestions}
                address="../../src/assets/VelhonTaloudenhoitaja/"
              />
            }
          />
        </Routes>

        <div>
          <i>Stina Palomäki 2024</i>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
