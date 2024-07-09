import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ComicList from "./components/ComicList";
import FrontPage from "./components/FrontPage";

import { Stack } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material";
import { blueGrey, grey } from "@mui/material/colors";
import ComicPages from "./components/ComicPages";
import {
  SiivetonLepakkoPages,
  VelhonTaloudenhoitajaPagesWithQuestions,
} from "./comicData";

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
          <Route
            path="/comics/siivetonlepakko"
            element={
              <ComicPages
                list={SiivetonLepakkoPages}
                address="../../src/assets/SiivetonLepakko/"
              />
            }
          />
          <Route
            path="/comics/velhontaloudenhoitaja"
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
