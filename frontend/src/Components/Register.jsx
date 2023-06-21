import {useState, useContext} from "react";
import { Button, Stack, TextField, Typography } from "@mui/material";
import { Formik } from 'formik';
import * as Yup from 'yup';
import LoginContext from "./Context/login-context";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";

// TOOD: match schema with acceptance criteria
const schema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().required("Email is required").email("Email is invalid"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(40, "Password must not exceed 40 characters"),
  confirm_password: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("password"), null], "Confirm Password does not match"),
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

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const login = useContext(LoginContext);

  function handleSubmit(event) {
    event.preventDefault();
    console.log(name, email, password, confirmPassword);
    localStorage.setItem("auth", true);
    localStorage.setItem("user-email", event.email);
    login.setIsLoggedIn(true);
  }

  return (
    <Formik
      validationSchema={schema}
      initialValues={{
        name: "",
        email: "",
        password: "",
        confirm_password: "",
      }}
    >
      <>
        <form onSubmit={handleSubmit}>
          <CenterCard>
            <Stack spacing={2} direction="column" width="100%">
              <Typography align='center' variant="h3">
                Welcome to QueueQuicker
              </Typography>
              <TextField
                type="text"
                variant="outlined"
                color="secondary"
                label="Name"
                onChange={(e) => setName(e.target.value)}
                value={name}
                required
              />
              <TextField
                type="email"
                variant="outlined"
                color="secondary"
                label="Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
                sx={{ mb: 4 }}
              />
              <TextField
                type="password"
                variant="outlined"
                color="secondary"
                label="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
                sx={{ mb: 4 }}
              />
              <TextField
                type="password"
                variant="outlined"
                color="secondary"
                label="Confirm Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
                required
                sx={{ mb: 4 }}
              />
              <Button variant="outlined" color="secondary" type="submit">
                Register
              </Button>
              <Typography align='center' variant='overline'>
                Already have an account? <Link to="../login">Login here</Link>
              </Typography>
            </Stack>
          </CenterCard>
        </form>
      </>
    </Formik>
  );
};

export default Register;