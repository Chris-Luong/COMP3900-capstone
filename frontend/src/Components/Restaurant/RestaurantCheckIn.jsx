import { useState, useContext } from "react";
import { InputBase, Button, Typography, Stack } from "@mui/material";
import CenterCard from "../UI/CenterCard";
import IconButton from "@mui/material/IconButton";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Paper from "@mui/material/Paper";
import sendRequest from "../Utils/Request";
import RestaurantContext from "../Context/restaurant-context";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import LoginContext from "../Context/login-context";
import jwtDecode from "jwt-decode";
import { loginUser } from "../Helper";

const RestaurantCheckIn = () => {
  const [bookingNumber, setBookingNumber] = useState("");
  const checkIn = useContext(RestaurantContext);
  const login = useContext(LoginContext);
  const navigate = useNavigate();

  const guestCheckIn = async () => {
    const uuid = uuidv4();
    const password = "guest123";
    const registerBody = {
      email: uuid,
      password: password,
      firstName: uuid,
      lastName: uuid,
      role: 1,
    };
    try {
      // generate and login a new guest account
      const registerRes = await sendRequest("/register", "POST", registerBody);
      const loginRes = await loginUser({
        email: uuid,
        password: password,
      });
      console.log(registerRes);
      login.setIsLoggedIn(true);
      console.log(loginRes);
      localStorage.setItem("token", loginRes.token);
      const token = jwtDecode(loginRes.token);
      localStorage.setItem("checkedIn", true);
      localStorage.setItem("accountId", token.accountId);
      localStorage.setItem("isGuest", true);
      // TODO: generate a new booking for 1 hour
      // TODO: login with that booking? not sure how it exactly works
      // TODO: this is only for guest check-in, actual booking check in is not done
      // TODO: set bookingId in local storage

      // currently creates a new table and gives it to this guest
      const capacity = 10;
      const tableRes = await sendRequest("/tables/create", "POST", {
        capacity,
      });
      localStorage.setItem("tableId", tableRes.tableId);
      checkIn.setIsCheckedIn(true);
      navigate("/restaurant");
    } catch (err) {
      alert(err);
      console.log(err);
    }
  };

  return (
    <CenterCard>
      <Stack width="100%" spacing={3}>
        <Typography align="center" variant="h3" marginBottom={5}>
          Welcome!
        </Typography>
        <Paper component="form" sx={{ display: "flex", alignItems: "center" }}>
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            type="number"
            placeholder="Enter Booking Number"
            onChange={(e) => setBookingNumber(e.target.value)}
            value={bookingNumber}
          />
          <IconButton onClick={(e) => console.log("submitting booking number")}>
            <ArrowForwardIcon />
          </IconButton>
        </Paper>
        <Typography align="center" variant="h3">
          Or
        </Typography>
        <Typography align="center">
          <Button
            variant="outlined"
            type="button"
            color="secondary"
            onClick={guestCheckIn}
          >
            Check In as Guest
          </Button>
        </Typography>
      </Stack>
    </CenterCard>
  );
};

export default RestaurantCheckIn;
