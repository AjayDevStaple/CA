import { useState, useEffect } from "react";
// react-router components
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Icon from "@mui/material/Icon";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
// Material Dashboard 2 React example components
import Sidenav from "examples/Sidenav";
import Configurator from "examples/Configurator";
// Material Dashboard 2 React themes
import theme from "assets/theme";
// Material Dashboard 2 React Dark Mode themes
import themeDark from "assets/theme-dark";
// Material Dashboard 2 React routes
import { userRoutes,adminRoutes,comonRoutes} from "routes";
// Material Dashboard 2 React contexts
import { useMaterialUIController, setMiniSidenav, setOpenConfigurator } from "context";
import { useSelector } from 'react-redux'
// Images
import brandWhite from "assets/images/logo-ct.png";
import brandDark from "assets/images/logo-ct-dark.png";

import UserRoute from "components/UserRoute";
import Dashboard from "user/layouts/dashboard";
import SignIn from "user/layouts/authentication/sign-in";
export default function App() {

  const { token,userType } = useSelector(state => state?.userProfile?.userData)
  const isLogin = token && userType ? true :false || false;
  const rout = userType!=undefined && userType=='2' ? userRoutes : userType=='1'? adminRoutes : comonRoutes;
  const navigate  = useNavigate ();
  const [controller, dispatch] = useMaterialUIController();
  const {
    miniSidenav,
    direction,
    openConfigurator,
    sidenavColor,
    transparentSidenav,
    whiteSidenav,
    darkMode,
  } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const { pathname } = useLocation();


  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  // Change the openConfigurator state
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);

  // Setting the dir attribute for the body element
  useEffect(() => {
    document.body.setAttribute("dir", direction);
  }, [direction]);

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    if(isLogin){
      navigate('/dashboard')
    }else{
      navigate('/')
    }
  }, []);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        return <Route exact path={route.route} element={route.component} key={route.key} />;
      }

      return null;
    });

  const configsButton = (
    <MDBox
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="3.25rem"
      height="3.25rem"
      bgColor="white"
      shadow="sm"
      borderRadius="50%"
      position="fixed"
      right="2rem"
      bottom="2rem"
      zIndex={99}
      color="dark"
      sx={{ cursor: "pointer" }}
      onClick={handleConfiguratorOpen}
    >
      <Icon fontSize="small" color="inherit">
        settings
      </Icon>
    </MDBox>
  );

  return (
  <ThemeProvider theme={darkMode ? themeDark : theme}>
    <CssBaseline />
    

      {isLogin && <> <Sidenav
      color={sidenavColor}
      brand={(transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite}
      brandName=""
      routes={rout}
      onMouseEnter={handleOnMouseEnter}
      onMouseLeave={handleOnMouseLeave}
      />
      
      <Configurator />
       {configsButton}
      
      </>
      }

      
    <Routes>
      {getRoutes(token!=''  && userType=='1' ? userRoutes: token!=''  && userType==='admin' ? adminRoutes :comonRoutes)}
      {/* {getRoutes(rout)} */}
      {/* <Route path="*" element={<Navigate to="/" />} /> */}
    </Routes>
  </ThemeProvider>
  )
}


