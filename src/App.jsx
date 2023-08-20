import { BottomNavigation, BottomNavigationAction, Box, CircularProgress, Container, Paper, ThemeProvider, createTheme } from "@mui/material";
import "./App.css";
import MuiNavbar from "./components/Navbar/MuiNavbar";
import Router from "./routes/Router";
import CssBaseline from "@mui/material/CssBaseline";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from "react-redux";
import useLoggedIn from "./hooks/useLoggedIn";
import { useEffect, useState } from "react";

import InfoIcon from '@mui/icons-material/Info';
import FavoriteIcon from '@mui/icons-material/Favorite';
import RecentActorsIcon from '@mui/icons-material/RecentActors';

import { Link } from "react-router-dom";
import ROUTES from "./routes/ROUTES";
import useCart from "./hooks/useCart";

const light = {
  palette: {
    mode: "light",
  },
};

const dark = {
  palette: {
    mode: "dark",
  },
};

const root = document.getElementById("root");

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const loggedIn = useLoggedIn();
  const cart = useCart();

  const isDarkTheme = useSelector((bigPie) => bigPie.darkThemeSlice.isDarkTheme);
  const isBiz = useSelector((bigPie) => bigPie.authSlice.isBiz);
  const isLoggedIn = useSelector((bigPie) => bigPie.authSlice.loggedIn);

  useEffect(() => {
    (async () => {
      await loggedIn();
      await cart();
      setIsLoading(false);
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    root.style.backgroundRepeat = "no-repeat";
    root.style.backgroundSize = "cover"
    if (isDarkTheme) {
      root.style.backgroundImage = "url(https://i.pinimg.com/originals/9e/28/38/9e28380f979b4efec8951da68558519f.jpg)";
    } else {
      root.style.backgroundImage = "url(https://c.wallhere.com/photos/81/6b/leaves_plants_green_background_blur-626705.jpg!d)";
    }
  }, [isDarkTheme]);

  return (
    <ThemeProvider theme={isDarkTheme ? createTheme(dark) : createTheme(light)}>
      <CssBaseline />
      <ToastContainer
        position="top-left"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
        theme="colored"
      />
      <Container>
        <header>
          <MuiNavbar />
        </header>
        <main>
          <Box paddingBottom={"56px"}>
            {
              isLoading ?
                <CircularProgress sx={{ position: "fixed", left: "50%", top: "50%" }} /> :
                <Router />
            }
          </Box>
        </main>
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
          <BottomNavigation showLabels>
            <BottomNavigationAction component={Link} to={ROUTES.ABOUT} label="About" icon={<InfoIcon />} />
            {
              isLoggedIn &&
              <BottomNavigationAction component={Link} to={ROUTES.FAVPLANTS} label="Favorite Plants" icon={<FavoriteIcon />} />
            }
            {
              isBiz &&
              <BottomNavigationAction component={Link} to={ROUTES.MYPLANTS} label="My Plants" icon={<RecentActorsIcon />} />
            }
          </BottomNavigation>
        </Paper>
      </Container>
    </ThemeProvider >
  );
}

export default App;