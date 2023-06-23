import { Button, Stack, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import LoginContext from "./Context/login-context";
import styled from "@emotion/styled";

// TOOD: match schema with acceptance criteria
const schema = Yup.object().shape({
  userId: Yup.string().required("User Id is required"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(40, "Password must not exceed 40 characters"),
});

const CenterCard = styled("Card")({
  display: "flex",
  textAlign: "left",
  maxHeight: "700px",
  maxWidth: "50vh",
  margin: "auto",
  marginTop: "15vh",
  border: "1px solid #d7d7d7",
  padding: "1rem",
  borderRadius: "6px",
});

const Login = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const login = useContext(LoginContext);

  function handleSubmit(event) {
    event.preventDefault();
    console.log(userId, password);
    localStorage.setItem("auth", true);
    localStorage.setItem("user-id", event.userId);
    login.setIsLoggedIn(true);
  }

  return (
    <Formik
      validationSchema={schema}
      initialValues={{
        userId: "",
        password: "",
      }}
    >
      <>
        <form onSubmit={handleSubmit}>
          <CenterCard>
            <Stack spacing={2} direction='column' width='100%'>
              <Typography align='center' variant='h3'>
                Staff Login
              </Typography>
              <TextField
                type='text'
                variant='outlined'
                color='secondary'
                label='User Id'
                onChange={(e) => setUserId(e.target.value)}
                value={userId}
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
                <Link to='../register'>
                  Make a multiple choice for wait/kitchen/manager
                </Link>
              </Typography>
            </Stack>
          </CenterCard>
        </form>
      </>
    </Formik>
  );
};

export default Login;
