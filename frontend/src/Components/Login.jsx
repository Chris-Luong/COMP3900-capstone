import { Button, Stack, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import LoginContext from "./Context/login-context";
import CenterCard from "./UI/CenterCard";
import sendRequest from "./Utils/Request";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

const schema = Yup.object().shape({
  email: Yup.string().required("Email is required").email("Email is invalid"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(10, "Password must not exceed 10 characters"),
});

const Login = () => {
  const login = useContext(LoginContext);
  const navigate = useNavigate();

  async function handleSubmit(values) {
    const body = {
      email: values.email,
      password: values.password,
      role: values.role,
    };
    try {
      const res = await sendRequest("/login", "POST", body);
      login.setIsLoggedIn(true);
      localStorage.setItem("token", res.token);
      localStorage.setItem("auth", true);
      localStorage.setItem("user-email", values.email);
      let token = jwtDecode(res.token);
      localStorage.setItem("role", token.role);
      localStorage.setItem("accountId", token.accountId);
      navigate("/home");
    } catch (err) {
      alert(err);
      console.log(err);
    }
  }

  return (
    <Formik
      validationSchema={schema}
      onSubmit={(values) => handleSubmit(values)}
      initialValues={{
        email: "",
        password: "",
        role: "",
      }}
    >
      {/* Check if below prop things are all needed */}
      {({ handleSubmit, handleChange, values, errors, touched }) => (
        <form onSubmit={handleSubmit} noValidate>
          <CenterCard>
            <Stack spacing={2} direction="column" width="100%">
              <Typography align="center" variant="h3">
                Welcome Back
              </Typography>
              <TextField
                type="email"
                variant="outlined"
                color="secondary"
                label="Email"
                name="email"
                onChange={handleChange}
                value={values.email}
                error={touched.email && errors.email}
                helperText={touched.email && errors.email}
                required
              />
              <TextField
                type="password"
                variant="outlined"
                color="secondary"
                label="Password"
                name="password"
                onChange={handleChange}
                value={values.password}
                error={touched.password && errors.password}
                helperText={touched.password && errors.password}
                required
              />
              <Button variant="outlined" color="secondary" type="submit">
                Login
              </Button>
              <Typography align="center" variant="overline">
                Don't have an account?{" "}
                <Link to="../register">Register here</Link>
              </Typography>
            </Stack>
          </CenterCard>
        </form>
      )}
    </Formik>
  );
};

export default Login;
