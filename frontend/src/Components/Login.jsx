import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div>
      <p>Customer Login here</p>
      <Typography align="center" variant="overline">
        Don't have an account? <Link to="../register">Register here</Link>
      </Typography>
    </div>
  );
};

export default Login;