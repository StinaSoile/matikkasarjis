import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeScreen from "./components/HomeScreen/HomeScreen";
import { Stack } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material";
import { blueGrey, grey } from "@mui/material/colors";
import ComicBook from "./components/ComicBook/ComicBook";
import { useEffect, useState } from "react";
import comicService from "./services/comicService";
import axios from "axios";

const theme = createTheme({
  palette: {
    primary: grey,
    secondary: blueGrey,
  },
  typography: {},
});

function App() {
  const [comicNames, setComicNames] = useState<string[]>([]);

  const getComicInfo = async () => {
    const nameList = [];
    try {
      const data = await comicService.getComicInfo();
      for (const comic of data) {
        nameList.push(comic.shortName);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.status);
        console.log(error.response);
      } else {
        console.error(error);
      }
    }
    setComicNames(nameList);
  };

  useEffect(() => {
    getComicInfo();
  });
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Stack justifyContent="center" alignItems="stretch">
                <HomeScreen />
              </Stack>
            }
          />
          {comicNames.map((comicName) => {
            return (
              <Route
                key={comicName}
                path={`/comics/${comicName}`}
                element={<ComicBook key={comicName} comicName={comicName} />}
              />
            );
          })}
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
