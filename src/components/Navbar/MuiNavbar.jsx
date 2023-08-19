import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import MiniNavLinkComponent from "./MiniNavLinkComponent";

import ROUTES from "../../routes/ROUTES";
import { useDispatch, useSelector } from "react-redux";
import { darkThemeActions } from "../../store/darkTheme";
import SearchPartial from "./SearchPartial";
import NavLinkComponent from "./NavLinkComponent";
import useLoggedIn from "../../hooks/useLoggedIn";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { Avatar } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import useCart from "../../hooks/useCart";

const aboutPage = {
  label: "About",
  url: "/about",
};

const notAuthPages = [
  {
    label: "Register",
    url: ROUTES.REGISTER,
  },
  {
    label: "Login",
    url: ROUTES.LOGIN,
  },
];

const authedPages = [
  {
    label: "Favorite Plants",
    url: ROUTES.FAVPLANTS,
  },
  {
    label: "Logout",
    url: ROUTES.LOGOUT,
  },
];

const MuiNavbar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [userIcon, setUserIcon] = React.useState(null);
  const [userAlt, setUserAlt] = React.useState(null);

  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCartClick = () => {
    navigate(ROUTES.CART);
  };

  const handleClose = () => {
    setAnchorElNav(null);
  };

  const dispatch = useDispatch();

  const isDarkTheme = useSelector((bigPie) => bigPie.darkThemeSlice.isDarkTheme);

  const isLoggedIn = useSelector((bigPie) => bigPie.authSlice.loggedIn);

  const isBiz = useSelector((bigPie) => bigPie.authSlice.isBiz);

  const payload = useSelector((bigPie) => bigPie.authSlice.payload);

  const cart = useSelector((bigPie) => bigPie.cartSlice.cartItemsNumber);

  const cartHook = useCart();

  const [cartItems, setCartItems] = useState(0);

  const loggedIn = useLoggedIn();

  useEffect(() => {
    if (!payload) {
      return;
    }
    (async () => {
      try {
        const user = await axios.get("/users/userInfo/");
        setUserIcon(user.data.imageUrl);
        setUserAlt(user.data.imageAlt);
      } catch (err) {
        console.log("Error", err.message);
      }
    })();
  }, [payload]);

  useEffect(() => {
    (async () => {
      try {
        await cartHook();
        setCartItems(cart);
      } catch (err) {
        console.log("Error", err.message);
      }
    })();
  }, [cart, cartHook]);

  const logoutClick = () => {
    localStorage.clear();
    loggedIn();
    setUserIcon(null);
    setUserAlt(null);
    toast.success('Logout Successful');
  };

  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: -3,
      top: 0,
      border: `1px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
    },
  }));

  const changeTheme = () => {
    dispatch(darkThemeActions.changeTheme());
  };

  return (
    <AppBar color="success" position="static">
      <Container maxWidth="xl">
        <Toolbar>
          <Typography sx={{ textDecoration: 'none' }} component={Link} color="textPrimary" to={ROUTES.HOME} noWrap>
            <Typography width={"40px"} height={"40px"} component={"img"} src="favicon.png" />
          </Typography>
          <Typography sx={{ textDecoration: 'none' }} component={Link} color="textPrimary" to={ROUTES.HOME} variant="h6" noWrap>
            Blooming Roots
          </Typography>

          {/* main navbar */}
          <Box paddingLeft={"20px"} sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <NavLinkComponent {...aboutPage} />
            {
              isBiz &&
              <NavLinkComponent key={"linkMyPlants"} label={"My Plants"} url={ROUTES.MYPLANTS} />
            }
            {
              isLoggedIn &&
              authedPages.map((page) => (
                page.url === ROUTES.LOGOUT ?
                  <NavLinkComponent key={"link" + page.label} onClick={logoutClick} {...page} /> :
                  <NavLinkComponent key={"link" + page.label} {...page} />
              ))
            }
          </Box>
          <Box sx={{
            '&:hover': {
              cursor: 'pointer'
            },
            my: 2,
            p: 2
          }}>
            <SearchPartial />
          </Box>
          <Box sx={{
            '&:hover': {
              cursor: 'pointer'
            },
            my: 2,
            p: 2,
            display: { xs: "none", md: "block" },
          }}>
            <IconButton
              onClick={changeTheme}>
              {
                isDarkTheme ?
                  <LightModeIcon /> : <DarkModeIcon />
              }
            </IconButton>
          </Box>
          {
            isLoggedIn &&
            <Box sx={{ display: { xs: "none", md: "flex" }, my: 2, p: 2 }}>
              <IconButton onClick={handleCartClick} aria-label="cart">
                <StyledBadge badgeContent={cartItems} color="error">
                  <ShoppingCartIcon />
                </StyledBadge>
              </IconButton>
            </Box>
          }
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {
              isLoggedIn ?
                <Typography sx={{ textDecoration: 'none' }} component={Link} color="textPrimary" to={ROUTES.PROFILE} noWrap>
                  <Avatar alt={userAlt} src={userIcon} />
                </Typography>
                :
                notAuthPages.map((page) => (
                  <NavLinkComponent key={"link" + page.label} {...page} />
                ))
            }
          </Box>

          {/* hamburger with menu */}
          <Box
            sx={{
              flexGrow: 1,
              flex: 1,
              display: { xs: "flex", md: "none" },
              justifyContent: "flex-end",
            }}
          >
            <IconButton
              size="large"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleClose}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {
                isLoggedIn &&
                <MenuItem
                  sx={{
                    justifyContent: "center"
                  }}
                  key={"miniLinksProfile"}>
                  <Box sx={{
                    my: 2,
                    p: 2,
                    display: { xs: "block", md: "none" },
                  }}>
                    <Typography sx={{ textDecoration: 'none' }} component={Link} color="textPrimary" to={ROUTES.PROFILE} noWrap>
                      <Avatar alt={userAlt} src={userIcon} />
                    </Typography>
                  </Box>
                </MenuItem>
              }
              {
                isLoggedIn &&
                <MenuItem
                  sx={{
                    justifyContent: "center"
                  }}
                  key={"miniLinksCart"}>
                  <Box sx={{
                    my: 2,
                    p: 2,
                    display: { xs: "block", md: "none" },
                  }}>
                    <IconButton onClick={handleCartClick} aria-label="cart">
                      <StyledBadge badgeContent={cartItems} color="error">
                        <ShoppingCartIcon />
                      </StyledBadge>
                    </IconButton>
                  </Box>
                </MenuItem>
              }
              <MiniNavLinkComponent isDarkMode={isDarkTheme} {...aboutPage} />
              {
                isBiz &&
                <MiniNavLinkComponent key={"linkMyPlants"} isDarkMode={isDarkTheme} label={"My Plants"} url={ROUTES.MYCARDS} />
              }
              {
                isLoggedIn ?
                  authedPages.map((page) => (
                    page.url === ROUTES.LOGOUT ?
                      <MiniNavLinkComponent key={"link" + page.label} isDarkMode={isDarkTheme} onClick={logoutClick} {...page} /> :
                      <MiniNavLinkComponent key={"link" + page.label} isDarkMode={isDarkTheme} {...page} />
                  ))
                  : notAuthPages.map((page) => (
                    <MiniNavLinkComponent key={"link" + page.label} isDarkMode={isDarkTheme} {...page} />
                  ))
              }
              <MenuItem
                sx={{
                  justifyContent: "center"
                }}
                key={"miniLinksDarkMode"}>
                <IconButton onClick={changeTheme}>
                  {
                    isDarkTheme ?
                      <LightModeIcon /> : <DarkModeIcon />
                  }
                </IconButton>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar >
  );
};

export default MuiNavbar;
