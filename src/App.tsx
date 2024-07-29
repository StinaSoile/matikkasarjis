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
  const comicNames = ["siivetonlepakko", "velhontaloudenhoitaja"];
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
          {comicNames.map((comicName) => {
            return (
              <Route
                key={comicName}
                path={`/comics/${comicName}`}
                element={<ComicPages key={comicName} comicName={comicName} />}
              />
            );
          })}
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
