import WaitStaff from "./Restaurant/WaitStaff";
import KitchenStaff from "./Restaurant/KitchenStaff";
import Manager from "./Restaurant/Manager";
import { Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import RestaurantContext from "./Context/restaurant-context";
import LoginContext from "./Context/login-context";
import Customer from "./Restaurant/Customer";

const Home = () => {
  const role = localStorage.getItem("role");

  const checkIn = useContext(RestaurantContext);
  const login = useContext(LoginContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    const items = { ...localStorage };
    console.log(items);
    checkIn.setIsCheckedIn(false);
    localStorage.removeItem("checkedIn");
    login.setIsLoggedIn(false);
    localStorage.clear();
    console.log(items);
    navigate("/");
  };

  return (
    <Container maxWidth='xl'>
      <div>
        {role === "Customer" && <Customer />}
        {role === "Wait Staff" && <WaitStaff />}
        {role === "Kitchen Staff" && <KitchenStaff />}
        {role === "Manager" && <Manager />}
      </div>
      <Typography
        variant='h2'
        component='h1'
        sx={{
          fontFamily: "Pacifico",
          color: "#333",
          fontWeight: 700,
          position: "absolute",
          left: 30,
          top: 15,
          "&:hover": {
            cursor: "pointer",
          },
        }}
        onClick={() => navigate("/")}
        color='secondary'
      >
        QueueQuicker
      </Typography>
      <Button
        sx={{
          position: "absolute",
          right: 30,
          top: 15,
        }}
        onClick={handleLogout}
        color='secondary'
      >
        Logout
      </Button>
    </Container>
  );
};

export default Home;
