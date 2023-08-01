import WaitStaff from "./Restaurant/WaitStaff";
import KitchenStaff from "./Restaurant/KitchenStaff";
import Manager from "./Restaurant/Manager";
import { Button, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import RestaurantContext from "./Context/restaurant-context";
import LoginContext from "./Context/login-context";
import Customer from "./Restaurant/Customer";

const Home = () => {
  const checkIn = useContext(RestaurantContext);
  const login = useContext(LoginContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    const items = { ...localStorage };
    console.log(items);
    checkIn.setIsCheckedIn(false);
    localStorage.removeItem("checkedIn");
    login.setIsLoggedIn(false);
    localStorage.removeItem("login-accountId");
    localStorage.removeItem("role");
    localStorage.removeItem("user-email");
    localStorage.removeItem("auth");
    localStorage.removeItem("token");
    console.log(items);
    navigate("/");
  };

  return (
    <Container maxWidth="xl" sx={{ pt: 4 }}>
      <div>
        {localStorage.getItem("role") === "Customer" && <Customer />}
        {localStorage.getItem("role") === "Wait Staff" && <WaitStaff />}
        {localStorage.getItem("role") === "Kitchen Staff" && <KitchenStaff />}
        {localStorage.getItem("role") === "Manager" && <Manager />}
      </div>
      <Button
        sx={{
          position: "absolute",
          right: 30,
          top: 20,
        }}
        onClick={handleLogout}
        color="secondary"
      >
        Logout
      </Button>
    </Container>
  );
};

export default Home;
