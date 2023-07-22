import { useState, useContext } from "react";
import { InputBase, Button, Typography, Stack } from "@mui/material";
import CenterCard from "../UI/CenterCard";
import IconButton from "@mui/material/IconButton";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Paper from "@mui/material/Paper";
import sendRequest from "../Utils/Request";
import RestaurantContext from "../Context/restaurant-context";
import { useNavigate } from "react-router-dom";

const RestaurantCheckIn = () => {
  const [bookingNumber, setBookingNumber] = useState("");
  const checkIn = useContext(RestaurantContext);
  const navigate = useNavigate();

  async function guestCheckIn() {
    const body = {
      email: "guest1",
      password: "temp123",
    };
    try {
      const tableRes = await sendRequest("/tables/create", "POST");
      localStorage.setItem("tableId", tableRes.tableId);
      // TODO: replace with more appropriate endpoint, e.g. /guest-checkin
      const res = await sendRequest("/login", "POST", body);
      localStorage.setItem("token", res.token);
      localStorage.setItem("checkedIn", true);
      checkIn.setIsCheckedIn(true);
      navigate("/restaurant");
    } catch (err) {
      alert(err);
      console.log(err);
    }
  }

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
            onClick={() => guestCheckIn()}
          >
            Check In as Guest
          </Button>
        </Typography>
      </Stack>
    </CenterCard>
  );
};

export default RestaurantCheckIn;
