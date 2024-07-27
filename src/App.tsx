import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FrontPage from "./components/FrontPage";
import { Stack } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material";
import { blueGrey, grey } from "@mui/material/colors";
import ComicPages from "./components/ComicPages";

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
              </Stack>
            }
          />
          <Route
            path="/comics/siivetonlepakko"
            element={<ComicPages comicName={"siivetonlepakko"} />}
          />
          <Route
            path="/comics/velhontaloudenhoitaja"
            element={<ComicPages comicName={"velhontaloudenhoitaja"} />}
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
