import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div>
      <p>Welcome back</p>
      <Typography align='center' variant='overline'>
        Don't have an account? <Link to='../register'>Register here</Link>
      </Typography>
    </div>
  );
};

export default Login;
