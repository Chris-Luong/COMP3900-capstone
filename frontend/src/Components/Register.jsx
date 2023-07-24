import { Button, Stack, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import CenterCard from "./UI/CenterCard";
import { Link } from "react-router-dom";
import sendRequest from "./Utils/Request";

// TOOD: match schema with acceptance criteria
const schema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string().required("Email is required").email("Email is invalid"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(10, "Password must not exceed 10 characters"),
  confirm_password: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("password"), null], "Confirm Password does not match"),
});

const Register = () => {
  const navigate = useNavigate();

  async function handleSubmit(values) {
    const body = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      password: values.password,
      role: 1,
    };
    try {
      const res = await sendRequest("/register", "POST", body);
      alert(res.message);
      navigate("/login");
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
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirm_password: "",
      }}
    >
      {({ handleSubmit, handleChange, values, errors, touched }) => (
        <form onSubmit={handleSubmit} noValidate>
          <CenterCard>
            <Stack spacing={2} direction="column" width="100%">
              <Typography align="center" variant="h3">
                Welcome to QueueQuicker
              </Typography>
              <Typography align="center" variant="body1">
                Create an account for booking and loyalty program management
              </Typography>
              <TextField
                type="text"
                variant="outlined"
                color="secondary"
                label="First Name"
                name="firstName"
                onChange={handleChange}
                value={values.firstName}
                error={touched.email && errors.firstName}
                helperText={touched.email && errors.firstName}
                required
              />
              <TextField
                type="text"
                variant="outlined"
                color="secondary"
                label="Last Name"
                name="lastName"
                onChange={handleChange}
                value={values.lastName}
                error={touched.lastName && errors.lastName}
                helperText={touched.lastName && errors.lastName}
                required
              />
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
              <TextField
                type="password"
                variant="outlined"
                color="secondary"
                label="Confirm Password"
                name="confirm_password"
                onChange={handleChange}
                value={values.confirm_password}
                error={touched.confirm_password && errors.confirm_password}
                helperText={touched.confirm_password && errors.confirm_password}
                required
              />
              <Button type="submit" variant="outlined" color="secondary">
                Register
              </Button>
              <Typography align="center" variant="overline">
                Already have an account? <Link to="../login">Login here</Link>
              </Typography>
            </Stack>
          </CenterCard>
        </form>
      )}
    </Formik>
  );
};

export default Register;
