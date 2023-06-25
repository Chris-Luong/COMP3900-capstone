import {
  Button,
  Stack,
  TextField,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import CenterCard from "./UI/CenterCard";
import { useContext } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import LoginContext from "./Context/login-context";
import sendRequest from "./Utils/Request";
import { useNavigate } from "react-router-dom";

// TODO: Include error handling with error/required messages
// Create API request for /staff-login or just login for both user types
const schema = Yup.object().shape({
  // TODO: Check how long email is expected to be
  email: Yup.string()
    .required("Email is required")
    .email("Please enter a valid email"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(40, "Password must not exceed 40 characters"),
});

const StaffLogin = () => {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [role, setRole] = useState("");
  const navigate = useNavigate();
  const login = useContext(LoginContext);

  // function handleSubmit(event) {
  //   event.preventDefault();
  //   console.log(email, password);
  //   localStorage.setItem("auth", true);
  //   localStorage.setItem("email", event.email);
  //   login.setIsLoggedIn(true);
  // }

  // TODO: test if POST req works properly
  async function handleSubmit(values) {
    const body = {
      email: values.email,
      password: values.password,
      role: values.role,
    };
    try {
      const res = await sendRequest("/login", "POST", body);
      console.log(res.token);
      console.log(res.message);
      login.setIsLoggedIn(true);
      localStorage.setItem("token", res.token);
      localStorage.setItem("auth", true);
      localStorage.setItem("user-email", values.email);
      // NOTE: Might need a different route for staff. Discuss in next sprint.
      navigate("/home");
    } catch (err) {
      // NOTE: might need a incorrect password message
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
            <Stack spacing={2} direction='column' width='100%'>
              <Typography align='center' variant='h3'>
                Staff Login
              </Typography>
              <TextField
                type='email'
                variant='outlined'
                color='secondary'
                label='Email'
                name='email'
                onChange={handleChange}
                value={values.email}
                error={touched.email && errors.email}
                helperText={touched.email && errors.email}
                required
              />
              <TextField
                type='password'
                variant='outlined'
                color='secondary'
                label='Password'
                name='password'
                onChange={handleChange}
                value={values.password}
                error={touched.password && errors.password}
                helperText={touched.password && errors.password}
                required
              />
              <RadioGroup
                aria-label='Role'
                name='role'
                value={values.role}
                onChange={handleChange}
              >
                <FormControlLabel
                  value='waitStaff'
                  control={<Radio />}
                  label='Wait Staff'
                />
                <FormControlLabel
                  value='kitchenStaff'
                  control={<Radio />}
                  label='Kitchen Staff'
                />
                <FormControlLabel
                  value='managementStaff'
                  control={<Radio />}
                  label='Management Staff'
                />
              </RadioGroup>
              <Button variant='outlined' color='secondary' type='submit'>
                Login
              </Button>
            </Stack>
          </CenterCard>
        </form>
      )}
    </Formik>
  );
};

export default StaffLogin;
