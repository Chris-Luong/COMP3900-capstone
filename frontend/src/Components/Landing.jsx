import { Link as RouterLink } from "react-router-dom";
import { useContext } from "react";
import { Typography, Button, Box, Container } from "@mui/material";
import LoginContext from "./Context/login-context";

const Landing = () => {
  const login = useContext(LoginContext);

  return (
    <Container>
      <Box sx={{ textAlign: 'center', padding: 3 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to Our Restaurant Wait Management System
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          Easily manage your waiting time, check our menu, and enjoy a seamless dining experience.
        </Typography>

        <Box sx={{ mt: 4 }}>
          <Button variant="contained" color="primary" component={RouterLink} to="../pricing" sx={{ mr: 2 }}>
            See Pricing
          </Button>
          <Button variant="contained" color="secondary" component={RouterLink} to="../menus">
            Check Our Menus
          </Button>
        </Box>

        {!login.isLoggedIn && (
          <Box sx={{ mt: 5 }}>
            <Typography variant="body1" gutterBottom>
              Already have an account? <RouterLink to="../login">Login here</RouterLink>
            </Typography>
            <Typography variant="body1" gutterBottom>
              Don't have an account? <RouterLink to="../register">Register here</RouterLink>
            </Typography>
            <Typography variant="body1" gutterBottom>
              Inside our restaurant? <RouterLink to="../restaurant">Check in and order here</RouterLink>
            </Typography>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default Landing;
