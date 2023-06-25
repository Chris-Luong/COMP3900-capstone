import { Button, Stack, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import LoginContext from "./Context/login-context";
import CenterCard from "./UI/CenterCard";

// TOOD: match schema with acceptance criteria
const schema = Yup.object().shape({
  email: Yup.string().required("Email is required").email("Email is invalid"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(40, "Password must not exceed 40 characters"),
});

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const login = useContext(LoginContext);

  function handleSubmit(event) {
    event.preventDefault();
    console.log(email, password);
    localStorage.setItem("auth", true);
    localStorage.setItem("user-email", event.email);
    login.setIsLoggedIn(true);
  }

  return (
    <Formik
      validationSchema={schema}
      initialValues={{
        email: "",
        password: "",
      }}
    >
      <>
        <form onSubmit={handleSubmit}>
          <CenterCard>
            <Stack spacing={2} direction='column' width='100%'>
              <Typography align='center' variant='h3'>
                Welcome back
              </Typography>
              <TextField
                type='email'
                variant='outlined'
                color='secondary'
                label='Email'
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
                sx={{ mb: 4 }}
              />
              <TextField
                type='password'
                variant='outlined'
                color='secondary'
                label='Password'
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
                sx={{ mb: 4 }}
              />
              <Button variant='outlined' color='secondary' type='submit'>
                Login
              </Button>
              <Typography align='center' variant='overline'>
                Don't have an account?{" "}
                <Link to='../register'>Register here</Link>
              </Typography>
            </Stack>
          </CenterCard>
        </form>
      </>
    </Formik>
  );
};

export default Login;
