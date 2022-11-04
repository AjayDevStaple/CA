/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================
Coded by www.creative-tim.com
 =========================================================
* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import { useState, useEffect } from "react";
// react-router-dom components
// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
// Authentication layout components
import BasicLayout from "user/layouts/authentication/components/BasicLayout";
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { userData, logout } from "../../../../src/redux/reducer/index";

import { _services } from "../../../Services/Api/index";

function Basic() {
  const { token, userType } = useSelector((state) => state?.userProfile?.userData);
  const isLogin = token && userType ? true : false || false;

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const [rememberMe, setRememberMe] = useState(false);
  // React States
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loginForm, setLoginform] = useState({
    email: "",
    password: "",
    rememberMe: rememberMe,
  });

  console.log("---------------common route started-------");

  console.log(token + "---token");
  console.log(userType + "---userType");

  const handleSetRememberMe = () => {
    setRememberMe(!rememberMe);
  };
  // User Login info
  // const database = [
  //   {
  //     username: "developer@gmail.com",
  //     password: "123456",
  //     userType:'user',
  //     token:'user/6ssdgfsg537537gd473254723gd255345345345345354454235435$#@24625462'
  //   },
  //   {
  //     username: "admin@gmail.com",
  //     password: "admin",
  //     userType:'admin',
  //     token:'admin/46573hsdvfhshfvsdf7sd7fs5df6sdf6s4f6s56fs6d5f6s5f6#$$%%sgydfsyds'
  //   }
  // ];

  const errors = {
    uname: "invalid useddrname",
    pass: "invalid password",
  };

  const handleChange = (e) => {
    console.log(loginForm);
    const { value, name } = e.target;
    setLoginform((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();
    var { email, password } = document.forms[0];

    _services
      .user_login(loginForm)
      .then((res) => {
        dispatch(userData(res.data));

        if (res.data.userType === "1") {
          navigate("/admindashboard");
        } else {
          navigate("/userdashboard");
        }

        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    // Find user login info
    //const uData = database.find((user) => user.username === email.value);
    // Compare user info
    // if (uData) {
    //   if (uData.password !== password.value) {
    //     // Invalid password
    //     setErrorMessages({ name: "pass", message: errors.pass });
    //   } else {
    //     setIsSubmitted(true);
    //     setErrorMessages({})

    //     dispatch(userData(uData))
    //     if(uData.userType=='user'){
    //       navigate("/dashboard");
    //     }else{
    //       navigate("/dashboard");
    //     }

    //   }
    // } else {
    //   setErrorMessages({ name: "uname", message: errors.uname });
    // }
  };

  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && <div className="error">{errorMessages.message}</div>;

  useEffect(() => {
    // console.log(isLogin);
    // if (isLogin) {
    //   navigate("/dashboard");
    // }
  }, []);
  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Sign in
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form" onSubmit={handleSubmit}>
            <MDBox mb={2}>
              <MDInput
                type="email"
                name={"email"}
                value={loginForm.email}
                onChange={handleChange}
                label="Email"
                fullWidth
              />
              {renderErrorMessage("uname")}
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="password"
                name={"password"}
                value={loginForm.password}
                onChange={handleChange}
                label="Password"
                fullWidth
              />
              {renderErrorMessage("pass")}
            </MDBox>
            <MDBox display="flex" alignItems="center" ml={-1}>
              <Switch checked={rememberMe} onChange={handleSetRememberMe} />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                onClick={handleSetRememberMe}
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;Remember me
              </MDTypography>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton type={"submit"} variant="gradient" color="info" fullWidth>
                sign in
              </MDButton>
            </MDBox>
            {/* <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Don&apos;t have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-up"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign up
                </MDTypography>
              </MDTypography>
            </MDBox> */}
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
